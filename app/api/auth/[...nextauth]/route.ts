import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Connect to MongoDB
        await connectDB();
        
        // 2. Find the user by email
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No admin found with this email");
        }

        // 3. Compare the entered password with the hashed password in DB
        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 4. Return the user object for the session
        return { 
          id: user._id.toString(), 
          email: user.email, 
          role: user.role 
        };
      },
    }),
  ],
  callbacks: {
    // This attaches the user role to the JWT token
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    // This makes the role available in the session for your components
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page path
  },
  session: {
    strategy: "jwt", // Essential for working with middleware
  },
  // Passing the secret explicitly to fix the [NO_SECRET] error
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };