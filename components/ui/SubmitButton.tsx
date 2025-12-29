"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`
        w-full transition-all duration-200 font-semibold
        bg-indigo-600 text-white 
        hover:bg-indigo-500 hover:shadow-md 
        active:scale-[0.98] active:bg-indigo-700
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save Product"
      )}
    </Button>
  );
}