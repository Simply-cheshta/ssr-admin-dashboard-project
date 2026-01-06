"use client";

import { useActionState } from "react";
import { registerAdmin } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { UserPlus, ShieldCheck, Mail, Lock } from "lucide-react";

export default function AdminOnboarding() {
  const [state, formAction] = useActionState(registerAdmin, { message: "" });

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <UserPlus className="text-indigo-600" />
            Add New Admin
          </div>
          <p className="text-sm text-slate-500">
            Create a secure account for internal team members.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.message && (
            <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              state.message.includes("Success") 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              <ShieldCheck size={16} />
              {state.message}
            </div>
          )}
          
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input id="name" name="name" placeholder="John Doe" required className="pl-9" />
              <UserPlus className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Input id="email" name="email" type="email" placeholder="admin@store.com" required className="pl-9" />
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Initial Password</Label>
            <div className="relative">
              <Input id="password" name="password" type="password" required className="pl-9" />
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Note:</strong> New admins will have the same permissions as you. Ensure the email address is verified before providing access.
          </p>
        </div>
      </div>
    </div>
  );
}
