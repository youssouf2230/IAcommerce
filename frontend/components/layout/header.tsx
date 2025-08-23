import MobileMenu from "./mobile-menu"
import RightActions from "../shared/right-actions"
import LaptopMenu from "./laptop-menu"
import axios from "axios"
import { API_BASE_URL } from '@/lib/utils';

console.log("API_BASE_URL", API_BASE_URL)

export default  async function Header () {
  let categories
  try{
     categories = await axios.get(`${API_BASE_URL}/api/categories/images`).then(res => res.data);
    
  }
  catch(e){
    // console.log(e)
    categories=[]
  }
 

  return (
    <header className="border-b  px-4z md:px-6 sticky top-2 rounded-md z-30  bg-background ">
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
