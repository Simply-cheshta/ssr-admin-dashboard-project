"use client";

import { useActionState, useState } from "react";
import { updateProduct } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/SubmitButton";

const CATEGORIES = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books",
  "Health & Wellness",
  "Toys & Games",
];

export default function EditProductForm({ product }: { product: any }) {
  const updateProductWithId = updateProduct.bind(null, product._id);

  const [state, dispatch] = useActionState(updateProductWithId, { 
    message: "", 
    errors: {} 
  });

  const isCustom = product.category && !CATEGORIES.includes(product.category);
  
  const [categoryType, setCategoryType] = useState(isCustom ? "Other" : product.category || "");

  return (
    <form action={dispatch} className="space-y-5 bg-white p-6 rounded-xl border shadow-sm">
      {state.message && (
        <div className={`p-4 rounded-lg text-sm font-medium border ${
          state.message.includes('Success') 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {state.message}
        </div>
      )}
      
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="name" defaultValue={product.name} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price} />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" defaultValue={product.stock} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-select">Category</Label>
        <select
          id="category-select"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={categoryType === "Other" || isCustom ? "Other" : categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Other">Other</option>
        </select>

        {(categoryType === "Other" || isCustom) ? (
          <div className="mt-2 animate-in fade-in slide-in-from-top-1">
            <Label htmlFor="category" className="text-xs text-slate-500">Custom Category Name</Label>
            <Input 
              id="category" 
              name="category" 
              placeholder="e.g. Gardening" 
              defaultValue={product.category}
              autoFocus 
            />
          </div>
        ) : (
          <input type="hidden" name="category" value={categoryType} />
        )}
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          defaultValue={product.imageUrl} 
          placeholder="https://example.com/image.jpg"
          className={state.errors?.imageUrl ? "border-red-500" : ""}
        />
        {state.errors?.imageUrl && (
          <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.imageUrl[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product.description} className="h-32" />
      </div>

      <SubmitButton />
    </form>
  );
}

