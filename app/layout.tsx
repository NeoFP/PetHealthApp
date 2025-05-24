import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/notification";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Health Companion",
  description: "Your companion for pet health and wellness",
  generator: "v0.dev",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: RootLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-white">
        <div className="flex flex-1 w-full bg-white">
          <AppSidebar />
          <main className="flex-1 w-full bg-white overflow-auto">
            <div className="min-h-full w-full bg-white">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
