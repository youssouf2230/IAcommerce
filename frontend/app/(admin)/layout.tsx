import { AppSidebar } from "@/components/dashboard/app-sidebar"
import ToggleTheme from "@/components/shared/toggle-theme"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Search } from "lucide-react"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="border p-3.5 w-full">
                <div className="flex justify-between space-x-3 items-center mr-2  mb-10">
                    <SidebarTrigger />
                        <div className="w-max relative flex-1">
                            <Search size={16} className="absolute left-2  top-2 text-muted-foreground" />
                            <Input className="pl-8 h-8 w-56" placeholder="Search" />
                        </div>
                    <ToggleTheme/>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}