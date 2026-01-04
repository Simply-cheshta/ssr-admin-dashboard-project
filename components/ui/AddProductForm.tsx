"use client";

import { useState, useActionState } from "react";
import { createProduct } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ArrowRight, ArrowLeft, ImageIcon, PackagePlus } from "lucide-react";

const CATEGORIES = [
  "Electronics", "Fashion", "Home", "Sports", "Books"
];

export default function AddProductForm() {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [state, formAction] = useActionState(createProduct, { message: "", errors: {} });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-8">
        <div className={`text-sm ${step === 1 ? "font-bold text-blue-600" : "text-gray-400"}`}>1. Basic Info</div>
        <div className={`text-sm ${step === 2 ? "font-bold text-blue-600" : "text-gray-400"}`}>2. Media & Save</div>
      </div>

      <form action={formAction} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        {state?.message && (
          <p className={`text-sm italic ${state.message.includes("Success") ? "text-emerald-600" : "text-red-500"}`}>
            {state.message}
          </p>
        )}

        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in transition-all">
            <h2 className="text-lg font-semibold flex items-center gap-2"><PackagePlus size={20}/> Product Details</h2>
            
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g. Wireless Headphones" required />
              {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" name="price" type="number" step="0.01" required />
                {state.errors?.price && <p className="text-red-500 text-xs mt-1">{state.errors.price[0]}</p>}
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" required />
                {state.errors?.stock && <p className="text-red-500 text-xs mt-1">{state.errors.stock[0]}</p>}
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <select name="category" className="w-full border rounded-md p-2 text-sm" required>
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {state.errors?.category && <p className="text-red-500 text-xs mt-1">{state.errors.category[0]}</p>}
            </div>

            <button 
              type="button" 
              onClick={() => setStep(2)} 
              className="w-full bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center gap-2 mt-4"
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in transition-all">
            <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20}/> Media & Description</h2>
            
            <div className="border-2 border-dashed p-4 rounded-lg text-center bg-gray-50">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="h-24 w-24 mx-auto mb-2 object-cover rounded" />
              ) : (
                <div className="text-gray-400 mb-2">No image uploaded</div>
              )}
              <Input type="file" accept="image/*" onChange={handleFileUpload} />
              
              <input type="hidden" name="imageUrl" value={imageUrl} />
              {state.errors?.imageUrl && <p className="text-red-500 text-xs mt-1">{state.errors.imageUrl[0]}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the product..." className="h-32" />
              {state.errors?.description && <p className="text-red-500 text-xs mt-1">{state.errors.description[0]}</p>}
            </div>

            <div className="flex gap-2 pt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="flex-1 border p-2 rounded-lg flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Back
              </button>
              <div className="flex-[2]">
                <SubmitButton disabled={uploading || !imageUrl} />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}