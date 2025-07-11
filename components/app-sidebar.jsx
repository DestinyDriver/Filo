"use client"

import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});
import Link from "next/link";

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Upload,
  Files,
  ShieldPlus,
  Newspaper,
  Star,
  Rabbit,
  Bug,

} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"




const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    
    {
      title: "Files",
      url: "/files",
      icon: Files,
      isActive: true,
      color:"text-sky-400",
      
    },
    {
      title: "Upload",
      url: "/upload",
      icon: Upload,
      
      color:"text-emerald-400",
    },
    {
      title: "Ugrade",
      url: "/ugrade",
      icon: ShieldPlus,
      color:"text-amber-400",
    },
    {
      title: "Newsletter",
      url: ".newsletter",
      icon: Newspaper,
      color:"text-rose-400",
    },
  ],
  navSecondary: [
    {
      title: "Star on Github",
      url: "#",
      icon: Star,
      color:"text-green-400",
      glow:"drop-shadow-[0_0_8px_#4ade80]",
    },
    {
      title: "Report Issue",
      url: "#",
      icon: Bug,
      color:"text-purple-400",
      glow:"drop-shadow-[0_0_8px_#c084fc]"
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  
  return (
    <Sidebar variant="inset" className={`border-r-1`} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem >
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Rabbit className="size-5 bg-neutral" />
                </div>
                <div className="grid flex-1 text-left text-xl leading-tight">
                  <span className={`${dancingScript.className} truncate font-medium`}>Filo Inc</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent >
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className={"border-t-1 "}>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
   
  );
}
