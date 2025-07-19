import { LoaderCircle } from "lucide-react";


export default function Loading() {
  // Or a custom loading skeleton component
  return  <div className="flex items-center justify-center h-[60vh] animate-spin">
    <LoaderCircle/>
  </div>
}