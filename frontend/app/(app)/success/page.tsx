import { redirect } from 'next/navigation'
import { CheckCircle, PackageCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface SuccessPageProps {
  searchParams: {
    status?: string
    orderId?: string
  }
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { status, orderId } = searchParams

  const orderIdNumber = orderId ? Number(orderId) : null

  // if (orderId || isNaN(orderIdNumber as number)) {
  //   redirect('/')
  // }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-lg w-full bg-card/20 shadow-xl border-emerald-500/30 border-2">
        <CardHeader className="flex items-center gap-3">
          <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={36} />
          <CardTitle className="text-emerald-700 dark:text-emerald-400 text-2xl">Order Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-neutral-800 dark:text-neutral-50 text-lg">
            Thank you! Your order is under processing.
          </div>
          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-50">
            <PackageCheck className="text-neutral-500 dark:text-neutral-400" size={20} />
            <span>Your order ID is:</span>
            <code className="font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded text-sm">
              {orderIdNumber}
            </code>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            You’ll receive an email with your order summary and tracking info soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
