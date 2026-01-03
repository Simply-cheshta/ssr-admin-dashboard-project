import { connectDB } from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Make sure 'export' is here!
export async function seedAdmin() {
  await connectDB();
  
  const existingAdmin = await User.findOne({ email: "admin@test.com" });
  if (existingAdmin) {
    console.log("Admin already exists, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await User.create({
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin"
  });
  
  console.log("Dummy admin created successfully");
}