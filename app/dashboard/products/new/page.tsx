import { createProduct } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProduct} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Input name="name" placeholder="e.g. Wireless Headphones" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price ($)</label>
                <Input name="price" type="number" step="0.01" required />
              </div>
              <div>
                <label className="text-sm font-medium">Stock Quantity</label>
                <Input name="stock" type="number" required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input name="category" placeholder="Electronics" required />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input name="imageUrl" placeholder="https://..." required />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
                name="description" 
                className="w-full border rounded-md p-2 h-32" 
                required 
              />
            </div>
            <Button type="submit" className="w-full">Save Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}