"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
        className: "shadow-lg",
      }}
      {...props}
    />
  );
};

export { Toaster };

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  duration?: number;
  id?: string;
}

const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      ...options,
      style: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        color: "#166534",
      },
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      ...options,
      style: {
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#b91c1c",
      },
    });
  },
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      ...options,
      style: {
        background: "#f0f9ff",
        border: "1px solid #bae6fd",
        color: "#0369a1",
      },
    });
  },
  dismiss: (toastId: string) => {
    sonnerToast.dismiss(toastId);
  },
};

export { toast };
 