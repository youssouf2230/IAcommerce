'use client'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import ToggleTheme from "../shared/toggle-theme"
import { ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "../shared/switch-language"
import { usePathname } from "next/navigation"
import { useNavigationLinks } from "../hooks/useNavigation"
import MobileMenu from "../shared/mobile-menu"


export default function Header() {
    const t = useTranslations('Header');
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
        <div className="flex items-center gap-5">
          {/* Cart Button */}
          <Button
            size="icon"
            variant="ghost"
            className="relative cursor-pointer"
            aria-label="Cart"
          >
            <p className="absolute -right-2 -top-2 size-4 flex items-center justify-center rounded-full bg-rose-600 text-[10px] text-white">
              2
            </p>
            <ShoppingCart size={20} />
          </Button>

          {/* Auth Buttons */}
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/signin">{t('auth.signIn')}</Link>
          </Button>
          <ToggleTheme />
          <LanguageSwitcher />



        </div>
      </div>
    </header>
  )
}
