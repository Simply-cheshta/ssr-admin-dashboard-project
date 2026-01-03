import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers"; // We'll create this below
import { seedAdmin } from "@/lib/seedAdmin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Product Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // --- ONE TIME SEED ---
  // This ensures the dummy admin (admin@test.com) is created in MongoDB
  try {
    await seedAdmin();
  } catch (error) {
    console.error("Seed error:", error);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* We wrap children in Providers so Auth works everywhere */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}