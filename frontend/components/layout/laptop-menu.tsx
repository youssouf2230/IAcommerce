'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useNavigationLinks } from "../../hooks/useNavigation"
import { Category } from "@/types"

const LaptopMenu = ({ categories }: { categories: Category[] }) => {
    const navigationLinks = useNavigationLinks();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
                <h1 className="text-2xl font-medium">Reeltek</h1>
            </Link>

            <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                    {navigationLinks.map((link, index) =>
                        link.href !== "/categories" ? (
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
                        ) : (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                                    {link.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px]  md:w-[500px] md:grid-cols-3 place-items-center p-3 gap-3 ">
                                        {categories.map((categorie) => (
                                            <ListItem
                                                key={categorie.id}
                                                href={`/categories/${categorie.id}`}
                                                imageUrl={categorie.urlImage}
                                                title={categorie.name}
                                            />
                                                
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

export default LaptopMenu;

function ListItem({
    title,
   
    href,
    imageUrl,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & {
    title: string;
    href?: string;
    imageUrl?: string;
}) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild className=" rounded-xl w-36 ">
                <Link href={href || "#"} className="block  hover:bg-accent rounded-full p-5 transition-colors">
                    <Image
                        priority
                        src={imageUrl || '/default.png'}
                        alt={title}
                        width={60}
                        height={60}
                        className="  aspect-square object-contain m-auto "
                    />
                    <div className="text-sm font-medium leading-none text-center my-1">{title}</div>
                  
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
