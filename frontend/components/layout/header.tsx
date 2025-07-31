import MobileMenu from "./mobile-menu"
import RightActions from "../shared/right-actions"
import LaptopMenu from "./laptop-menu"
import axios from "axios"


export default  async function Header () {
   const categories = await axios.get('http://localhost:8080/api/categories/images').then(res => res.data);
  if(!categories) return null

  return (
    <header className="border-b  px-4 md:px-6 sticky top-2 rounded-full z-30  bg-background ">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileMenu />
          {/* Logo & Desktop Nav */}
          <LaptopMenu  categories={categories} />
        </div>
        {/* Right: Actions */}
        <RightActions />
      </div>
    </header>
  )
}
