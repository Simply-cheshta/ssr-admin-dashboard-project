import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton } from "@/components/ui/DeleteButton"; 
import Link from "next/link";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Link 
          href="/dashboard/products/new" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product._id.toString()}>
                <TableCell>
                  <img 
                    src={product.imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded-md border bg-slate-50"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right space-x-4">
                  <Link 
                     href={`/dashboard/products/${product._id.toString()}`}
                     className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                    >
                    Edit
                  </Link>
                  <DeleteButton id={product._id.toString()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}