"use server";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductSchema } from "./validations";

export async function createProduct(prevState: any, formData: FormData) {
  try {
    await connectDB();
    
    // Now formData will be the actual FormData object
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = ProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Product.",
      };
    }

    await Product.create(validatedFields.data);
    revalidatePath("/dashboard/products");
    
    return { message: "Success!", errors: {} };
  } catch (err) {
    return { message: "Database Error", errors: {} };
  }
}

export async function updateProduct(productId: string, prevState: any, formData: FormData) {
  await connectDB();
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = ProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Product.",
    };
  }

  try {
    await Product.findByIdAndUpdate(productId, validatedFields.data);
    revalidatePath("/dashboard/products");
    return { message: "Success! Product updated.", errors: {} };
  } catch (err) {
    return { message: "Database Error: Failed to Update.", errors: {} };
  }
}

export async function deleteProduct(productId: string) {
  "use server";
  try {
    await connectDB();
    await Product.findByIdAndDelete(productId);
    revalidatePath("/dashboard/products");
  } catch (error) {
    console.error("Delete failed:", error);
  }
}
