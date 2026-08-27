import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold font-poppins text-rebel-black mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-5 py-3.5 bg-gray-50 border border-rebel-gray-border rounded-lg text-sm text-rebel-black placeholder:text-rebel-gray-placeholder focus:outline-none focus:ring-2 focus:ring-rebel-black/20 focus:border-rebel-black transition-all",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-poppins">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold font-poppins text-rebel-black mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={5}
        className={cn(
          "w-full px-5 py-3.5 bg-gray-50 border border-rebel-gray-border rounded-lg text-sm text-rebel-black placeholder:text-rebel-gray-placeholder focus:outline-none focus:ring-2 focus:ring-rebel-black/20 focus:border-rebel-black transition-all resize-y",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-poppins">{error}</p>}
    </div>
  );
}
