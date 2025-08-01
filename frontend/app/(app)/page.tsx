
// import BannerSection from "@/components/sections/banner-section";
import CategorySection from "@/components/sections/category-section";
import FeaturesProducts from "@/components/sections/features-products";

import HeroSection from "@/components/sections/hero-section";
import LatestSections from "@/components/sections/latest-sections";
import SustainabilityHighlight from "@/components/sections/sustainability-highlight";


export default function Page() {
  return (
    <main className="">
     <HeroSection/>
     <FeaturesProducts/>
     <LatestSections/>
     <CategorySection/>
     <SustainabilityHighlight/>
     {/* <BannerSection/> */}
    </main>
  );
}
