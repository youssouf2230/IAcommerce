// app/unauthorized/page.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"


export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div
        
      >
        <Card className="shadow-lg border-red-200">
          <CardHeader className="flex flex-col items-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-red-500 animate-pulse"  />
            <CardTitle className="text-center text-2xl font-semibold text-gray-900">
              Access Denied
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              You don’t have permission to view this page.
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="default" >
                  Go Home
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
