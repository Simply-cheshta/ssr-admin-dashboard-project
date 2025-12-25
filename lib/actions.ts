"use server";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  await connectDB();

  // Extract data from form
  const rawFormData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    stock: Number(formData.get("stock")),
    imageUrl: formData.get("imageUrl"),
  };

  // Save to MongoDB
  await Product.create(rawFormData);

  // Refresh the product list page and redirect
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}