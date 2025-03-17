"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Activity, MessageSquare, Pill, Utensils, Dumbbell, PawPrint } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Disease Prediction",
    href: "/disease-prediction",
    icon: Pill,
  },
  {
    title: "Dog Nutrition",
    href: "/dog-nutrition",
    icon: Utensils,
  },
  {
    title: "Disease Exercise",
    href: "/disease-exercise",
    icon: Dumbbell,
  },
  {
    title: "Symptom Prediction",
    href: "/symptom-prediction",
    icon: Activity,
  },
  {
    title: "Chat with Vet",
    href: "/chat-with-vet",
    icon: MessageSquare,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Pet Health</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
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
  )
}

