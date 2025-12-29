import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import EditProductForm from "@/components/ui/EditProductForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const serializedProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-500 text-sm">Update details for "{serializedProduct.name}"</p>
      </div>
      
      <EditProductForm product={serializedProduct} />
    </div>
  );
}