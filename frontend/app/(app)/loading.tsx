import { LoaderCircle } from "lucide-react";


export default function Loading() {
  // Or a custom loading skeleton component
  return  <div className="flex items-center justify-center h-[80vh] animate-spin">
    <LoaderCircle size={80} className="text-primary"/>
  </div>
}