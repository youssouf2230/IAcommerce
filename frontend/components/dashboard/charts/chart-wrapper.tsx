"use client"

import { LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ChartWrapperProps = {
  title: string
  description?: string
  footerText?: string
  footerSubText?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}

export function ChartWrapper({
  title,
  description,
  footerText,
  footerSubText,
  icon: Icon,
  children,
  className,
}: ChartWrapperProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {footerText && (
                <div className="flex items-center gap-2 leading-none font-medium">
                  {footerText} {Icon && <Icon className="h-4 w-4" />}
                </div>
              )}
              {footerSubText && (
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  {footerSubText}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
