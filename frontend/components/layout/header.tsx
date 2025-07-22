'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useNavigationLinks } from "../hooks/useNavigation"
import MobileMenu from "../shared/mobile-menu"
import RightActions from "../shared/right-actions"


export default function Header() {
   
  
    
    
    const navigationLinks = useNavigationLinks();
  const pathname = usePathname();
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-2">
       
         <MobileMenu/>
          

          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
              <h1 className="text-2xl font-medium">Reeltek</h1>
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild

                      data-active={pathname === link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link href={link.href}>
                        {link.label}

                      </Link>

                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right: Actions */}
      <RightActions />
      </div>
    </header>
  )
}
