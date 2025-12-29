"use client";

import { deleteProduct } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Delete this product?")) {
          startTransition(() => deleteProduct(id));
        }
      }}
      disabled={isPending}
      className="text-slate-400 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}