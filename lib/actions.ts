"use server";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductSchema } from "./validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"

export async function createProduct(prevState: any, formData: FormData) {
  try {
    await connectDB();
    const rawData = Object.fromEntries(formData.entries());
    
    console.log("FORM DATA RECEIVED:", rawData);

    const validatedFields = ProductSchema.safeParse(rawData);

    if (!validatedFields.success) {

      console.error("ZOD ERRORS:", validatedFields.error.flatten().fieldErrors);
      
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Check terminal for details.",
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

export async function registerAdmin(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  const user = session?.user as any;

  if (!session || user?.role !== "admin") {
    return { message: "Error: Unauthorized. Only existing admins can perform this action." };
  }

  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "Error: An account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", 
    });

    revalidatePath("/dashboard/admins");
    return { message: "Success: New admin registered successfully!" };
  } catch (err) {
    console.error(err);
    return { message: "Database Error: Failed to create admin account." };
  }
}