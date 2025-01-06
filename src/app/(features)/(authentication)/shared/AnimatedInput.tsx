"use client";
import { Input } from "@/components/ui/input";
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prompt: string;
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  shake?: boolean; // Add shake prop
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      prompt,
      placeholder,
      id,
      value,
      onChange,
      type = "text",
      error,
      shake = false, // Default shake to false
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className="relative">
          <Input
            id={id}
            onChange={onChange}
            value={value}
            ref={ref}
            type={type}
            {...props}
            className={cn(`pt-5 group ${props.className}`, {
              "border-red-600 focus-visible:ring-red-600": error,
              "animate-shake": shake, // Apply shake animation when shake is true
            })}
            placeholder={placeholder}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <label
            htmlFor={id}
            className={cn(
              "absolute left-3 px-1 transition-all duration-200 ease-in-out hover:cursor-text group-disabled:text-blue-500",
              "floating-label group-disabled:text-blue-500",
              {
                "text-red-600": error,
              }
            )}
          >
            {prompt}
          </label>
        </div>
        {error && (
          <div
            className="mt-1.5 flex flex-row items-center"
            id={`${id}-error`}
            role="alert"
          >
            <AlertCircleIcon className="mr-1 text-red-600" size={18} />
            <p className="text-xs font-medium text-red-600">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
