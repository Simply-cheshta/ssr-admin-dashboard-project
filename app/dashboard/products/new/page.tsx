import AddProductForm from "@/components/ui/AddProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create New Product</h1>
        <p className="text-slate-500">Complete the steps below to add a product to your inventory.</p>
      </div>
      <AddProductForm />
    </div>
  );
}