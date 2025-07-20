

import ToggleTheme from "@/components/shared/toggle-theme"
import Image from "next/image"
import Link from "next/link"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between  items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
           Reeltek
          </Link>
          <ToggleTheme/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
          {children}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
          <h3 className="z-10 absolute bottom-10 left-6   text-4xl text-zinc-50 font-medium">  Innovation is just a click away. Sign in to browse electronics that redefine performance and style</h3>
        <Image
          src="https://images.pexels.com/photos/28706295/pexels-photo-28706295.jpeg"
          loading="lazy"
          alt="Image"
          width={500}
          height={500}
          className="absolute  z-0 inset-0 h-full w-full object-cover dark:brightness-40 brightness-75  grayscale-25 "
        />

      </div>


    </div>
  )
}
