'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 px-4">
      <AlertCircle className="text-red-500 w-12 h-12" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Oops! Something went wrong.</h2>
      <p className="text-sm text-muted-foreground">
        We encountered an unexpected error. Please try again.
      </p>
      <Button onClick={() => reset()} className="mt-2">
        Try Again
      </Button>
    </div>
  )
}
