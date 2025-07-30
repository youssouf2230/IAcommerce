
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import {  Settings, Users, FileText, ShoppingBag } from "lucide-react"
import Link from "next/link"

const actions = [
    {
        title: "User Management",
        description: "Add or remove users",
        icon: Users,
        href: "/dashboard/users",
    },
    {
        title: "Settings",
        description: "Update system preferences",
        icon: Settings,
        href: "/dashboard/settings",
    },
    {
        title: "Reports",
        description: "View recent reports",
        icon: FileText,
        href: "/dashboard/reports",
    },
    {
        title: "Add Product",
        description: "Add a new product",
        icon: ShoppingBag,
        href: "/",
    },
]

export function DashboardActions() {

    return (

        <div className="bg-card/80 px-7 py-6 rounded-3xl  my-10  w-max">
            <h1 className="text-3xl font-semibold mb-6 mt-4">Quick Actions</h1>
            <div className="grid gap-4 max-w-sm  w-sm grid-cols-2 ">
                {actions.map((action, idx) => (
                    <Link href={action.href} key={idx}>

                        <Card

                            className="cursor-pointe rounded-3xl  w-44 hover:bg-muted-foreground/10 transition"
                        >
                            <CardHeader className="flex flex-col  items-center justify-between ">
                                <action.icon className="size-6 " />
                                <CardTitle className="text-sm font-extralight text-foreground/60">{action.title}</CardTitle>
                            </CardHeader>

                        </Card>
                    </Link>
                ))}
            </div>


        </div>
    )
}
