'use client'
import { Calendar, Home, Inbox, LogOut, Search, Settings, ShoppingBag, ShoppingBasket, ShoppingCart, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { handleLogout } from "@/app/actions/auth-action";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Porducts",
    url: "/dashboard/products",
    icon: ShoppingBag,
  },
  {
    title: "Users",
    url: "#",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {

    const pathname=usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Reeltek</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname===item.url}  className="py-4.5  " asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarFooter>
                
            </SidebarFooter>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>

           <div className="flex items-center justify-between px-8 py-2 border rounded-2xl bg-muted/20">
            <div className="flex items-center  gap-2">
              <span  className="font-medium bg-muted p-1.5 rounded-2xl">
                AT
              </span>
              <span className="text-xs font-medium">
                Achraf Tichirra
              </span>
            </div>
           <form action={handleLogout}>

            <Button size="sm" variant="outline" className="rounded-full aspect-square bg-muted/50"> 
                <LogOut size={20}/>
            </Button>
           </form>
           </div>
      </SidebarFooter>
    </Sidebar>
  )
}