"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  MessageSquare,
  Pill,
  Utensils,
  Camera,
  User,
  Activity,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Disease Detection",
    href: "/disease-detection",
    icon: Pill,
  },
  {
    title: "Nutrition Planner",
    href: "/nutrition-planner",
    icon: Utensils,
  },
  {
    title: "Skin Disease Tool",
    href: "/skin-disease",
    icon: Camera,
  },
  {
    title: "Chatbot",
    href: "/chatbot",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  // Don't show sidebar on login, signup or home page
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <Sidebar className="border-r bg-white dark:bg-gray-950">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-700" />
            <span className="text-xl font-bold text-green-800">Pet Health</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className={
                  pathname === item.href
                    ? "bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-300"
                    : ""
                }
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
