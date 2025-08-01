'use client'
import { Home, LayoutGrid, LogOut, Settings, ShoppingBag, ShoppingCart, User } from "lucide-react"

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
import { handleLogout } from "@/actions/auth-action";
import { useSession } from "@/hooks/use-session";
import { User as UserType } from "@/types";

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
    title: "Categories",
    url: "/dashboard/categories",
    icon: LayoutGrid,
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

  const { session, isLoading } = useSession()
  const user = session?.user
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Reeltek</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} className="py-4.5  " asChild>
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
        {isLoading ? <UserINfoSkeleton /> : <UserInfo user={user as UserType} />}
      </SidebarFooter>
    </Sidebar>
  )
}


const UserInfo = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center justify-between px-8 py-2 border rounded-2xl bg-muted/20">
      <div className="flex items-center  gap-2">
        <span className="font-medium bg-muted p-1.5 rounded-2xl">
          {user?.username?.charAt(0).toUpperCase()}
          {user?.username?.charAt(1).toUpperCase()}
        </span>
        <span className="text-sm font-medium capitalize">
          {user?.username || "Guest"}
        </span>
      </div>
      <form action={handleLogout}>

        <Button size="sm" variant="outline" className="rounded-full aspect-square bg-muted/50">
          <LogOut size={20} />
        </Button>
      </form>
    </div>
  )
}

const UserINfoSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-8 py-2 border rounded-2xl bg-muted/20">
      <div className="flex items-center  gap-2">
        <span className="font-medium bg-muted p-1.5 size-8 rounded-2xl">

        </span>
        <span className="text-sm font-medium  w-24 h-4 rounde-md bg-muted capitalize">

        </span>
      </div>
      <span className="font-medium bg-muted p-1.5 size-8 rounded-2xl">

      </span>
    </div>
  )
}