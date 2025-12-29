"use client";

import { useActionState } from "react";
import { createProduct } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/SubmitButton";

type FormState = {
  message: string;
  errors: {
    name?: string[];
    price?: string[];
    stock?: string[];
    category?: string[];
    imageUrl?: string[];
    description?: string[];
  };
};

export default function NewProductPage() {
  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(createProduct, initialState);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          {state?.message && (
            <p className={`text-sm font-medium ${state.message.includes('Success') ? 'text-emerald-600' : 'text-red-500'}`}>
              {state.message}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
            
            <div>
              <Label>Product Name</Label>
              <Input 
                name="name" 
                placeholder="e.g. Wireless Headphones"
                className={state.errors?.name ? "border-red-500 ring-red-100" : ""} 
              />
              {state.errors?.name && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.name[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price ($)</Label>
                <Input 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  className={state.errors?.price ? "border-red-500 ring-red-100" : ""}
                />
                {state.errors?.price && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.price[0]}</p>}
              </div>
              <div>
                <Label>Stock</Label>
                <Input 
                  name="stock" 
                  type="number" 
                  className={state.errors?.stock ? "border-red-500 ring-red-100" : ""}
                />
                {state.errors?.stock && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.stock[0]}</p>}
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Input 
                name="category" 
                className={state.errors?.category ? "border-red-500 ring-red-100" : ""}
              />
              {state.errors?.category && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.category[0]}</p>}
            </div>

            <div>
              <Label>Image URL</Label>
              <Input 
                name="imageUrl" 
                className={state.errors?.imageUrl ? "border-red-500 ring-red-100" : ""}
              />
              {state.errors?.imageUrl && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.imageUrl[0]}</p>}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea 
                name="description" 
                className={`h-32 ${state.errors?.description ? "border-red-500 ring-red-100" : ""}`} 
              />
              {state.errors?.description && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.description[0]}</p>}
            </div>

            <SubmitButton />
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}