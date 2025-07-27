import MobileMenu from "./mobile-menu"
import RightActions from "../shared/right-actions"
import LaptopMenu from "./laptop-menu"


export default function Header() {

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileMenu />
          {/* Logo & Desktop Nav */}
          <LaptopMenu />
        </div>
        {/* Right: Actions */}
        <RightActions />
      </div>
    </header>
  )
}
