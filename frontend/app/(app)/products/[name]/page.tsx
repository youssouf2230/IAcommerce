/* eslint-disable @typescript-eslint/no-unused-vars */
// app/products/[name]/page.tsx

import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  // Simulated product data
  const product = {
    name: "Clavier Logitech Trail Loop",
    price: "$44.99",
    oldPrice: "$59.99",
    rating: 4,
    imageUrl:
      "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pop-keys-wireless-mechanical/gallery/pop-keys-daydream-gallery-1-us-intl.png",
    category: "Accessories",
    stock: 25,
    sku: "TRL-001-LOGI",
    description:
      "Trail Loop is a lightweight, soft, and breathable band designed for all-day comfort. Perfect for workouts and everyday wear.",
    features: [
      "Soft, breathable material",
      "Compatible with most smartwatches",
      "Adjustable fit",
      "Sweat and water-resistant",
    ],
    brand: "Logitech",
    discount: "25%",
    tags: ["fitness", "watch band", "accessory", "loop"],
    isAvailable: true,
    colors: ["Black", "Blue", "Orange"],
    deliveryInfo: "Free delivery in 3-5 business days.",
    returnPolicy: "30-day return policy.",
    warranty: "1-year limited hardware warranty.",
    material: "Nylon and silicone",
    weight: "200g",
    dimensions: "15 x 10 x 3 cm",
  };

  return (
    <div className="mx-auto my-20 ">
      <div className="flex flex-wrap gap-10">
        {/* Product Image */}
        <Image
          src={product.imageUrl}
          width={600}
          height={600}
          alt={product.name}
          className="rounded-lg object-contain m-auto "
        />

        {/* Product Info */}
        <div className="flex-1 min-w-sm space-y-4">
          <h1 className="sm:text-5xl text-4xl font-semibold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">
            {product.category} • SKU: {product.sku}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill={i < product.rating ? "currentColor" : "none"}
                stroke="currentColor"
                className="size-5"
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              ({product.rating}/5)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="sm:text-2xl text-xl font-bold text-green-500">{product.price}</span>
            <span className="line-through text-muted-foreground">
              {product.oldPrice}
            </span>
            <span className="text-red-500 font-medium">{product.discount} OFF</span>
          </div>

          {/* Description */}
          <p className="sm:text-2xl text-lg   font-medium text-foreground">{product.description}</p>

          {/* Features */}
          <ul className="list-disc pl-5  text-foreground/80">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2  mt-4 text-foreground/80">
            <p><strong className="text-foreground">Brand:</strong> {product.brand}</p>
            <p><strong className="text-foreground">Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
            <p><strong className="text-foreground">Colors:</strong> {product.colors.join(", ")}</p>
            <p><strong className="text-foreground">Tags:</strong> {product.tags.join(", ")}</p>
            <p><strong className="text-foreground">Material:</strong> {product.material}</p>
            <p><strong className="text-foreground">Weight:</strong> {product.weight}</p>
            <p><strong className="text-foreground">Dimensions:</strong> {product.dimensions}</p>
            <p><strong className="text-foreground">Warranty:</strong> {product.warranty}</p>
            <p><strong className="text-foreground">Delivery:</strong> {product.deliveryInfo}</p>
            <p><strong className="text-foreground">Returns:</strong> {product.returnPolicy}</p>
          </div>

          {/* Button */}
          <Button className="mt-4" size="lg">
            <ShoppingCart className="mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
