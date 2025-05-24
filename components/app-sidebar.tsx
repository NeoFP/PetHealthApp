"use client";
import { usePathname, useRouter } from "next/navigation";
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
  Dumbbell,
  LogOut,
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
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
    title: "Activity Planner",
    href: "/activity-planner",
    icon: Dumbbell,
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
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

  // Don't show sidebar on login, signup or home page, or when not authenticated
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    !isLoggedIn
  ) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar className="border-r bg-white w-72 min-w-72">
      <SidebarHeader className="p-6 border-b bg-white">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-green-700" />
            <span className="text-2xl font-bold text-green-800">
              Pet Health
            </span>
          </Link>
        </div>
        {user && (
          <div className="mt-3 text-sm text-gray-600">
            Welcome, {user.name || user.email.split("@")[0]}!
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="bg-white p-4">
        <SidebarMenu className="space-y-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className={`h-12 px-4 rounded-lg text-base font-medium ${
                  pathname === item.href
                    ? "bg-green-100 text-green-900 border border-green-200"
                    : "hover:bg-gray-50 text-gray-700 hover:text-green-800"
                }`}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-6 w-6" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Logout Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
      <div className="absolute bottom-6 left-0 right-0 px-6">
        <SidebarTrigger className="w-full h-10 bg-gray-100 hover:bg-gray-200 text-gray-600" />
      </div>
    </Sidebar>
  );
}
