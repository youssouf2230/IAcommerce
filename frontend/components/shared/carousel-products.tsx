import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Product } from "../../types";
import ProductCard from "../product/product-card";

const CarouselProducts = ({ products,className }: { products: Product[],className?:string }) => {
    
  return (
    
      <Carousel className= {className}>
        <CarouselContent >
          {products?.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  />
        <CarouselNext />
      </Carousel>

  );
};

export default CarouselProducts;
