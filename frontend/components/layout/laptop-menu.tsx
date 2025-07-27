'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useNavigationLinks } from "../../hooks/useNavigation"

const LaptopMenu = () => {
    const navigationLinks = useNavigationLinks();
    const pathname = usePathname();
    return (
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
    );
}

export default LaptopMenu;
