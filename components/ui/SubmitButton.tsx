"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  disabled?: boolean;
}

export function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled} 
      className={`
        w-full transition-all duration-200 font-semibold
        bg-indigo-600 text-white 
        hover:bg-indigo-500 hover:shadow-md 
        active:scale-[0.98] active:bg-indigo-700
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      {(pending || disabled) ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {disabled ? "Uploading Image..." : "Saving..."}
        </>
      ) : (
        "Save Product"
      )}
    </Button>
  );
}