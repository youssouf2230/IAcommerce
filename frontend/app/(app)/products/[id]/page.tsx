// app/products/[id]/page.tsx

import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  purchasePrice: number;
  sellPrice: number;
  stockQuantity: number;
  description: string;
  oldPrice: number;
  numberOfView: number;
  rating: number;
  numberOfComments: number;
  numberOfLiked: number;
  hasLiked: boolean;
  numberOfDisliked: number;
  date: string;
  category: {
    id: number;
    name: string;
  };
  imageUrls: string[];
};

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:8080/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
        <div className="text-red-500 mt-10 text-center">
          Product no found
        </div>
    );
  }

  const product: Product = await res.json();

  // Les données statics que les attributs ne sont pas créer
  const staticData = {
    brand: "Logitech",
    discount: "25%",
    tags: ["fitness", "watch band", "accessory", "loop"],
    features: [
      "Soft, breathable material",
      "Compatible with most smartwatches",
      "Adjustable fit",
      "Sweat and water-resistant",
    ],
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
              src={product.imageUrls[0]}
              width={600}
              height={600}
              alt={product.name}
              className="rounded-lg object-contain m-auto "
          />

          {/* Product Info */}
          <div className="flex-1 min-w-sm space-y-4">
            <h1 className="sm:text-5xl text-4xl font-semibold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">
              {product.category?.name} • SKU: TRL-001-LOGI
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                      key={i}
                      fill={i < Math.round(product.rating) ? "currentColor" : "none"}
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
            <span className="sm:text-2xl text-xl font-bold text-green-500">
              {product.sellPrice} €
            </span>
              <span className="line-through text-muted-foreground">
              {product.oldPrice} €
            </span>
              <span className="text-red-500 font-medium">{staticData.discount} OFF</span>
            </div>

            {/* Description */}
            <p className="sm:text-2xl text-lg font-medium text-foreground">
              {product.description}
            </p>

            {/* Features */}
            <ul className="list-disc pl-5  text-foreground/80">
              {staticData.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
              ))}
            </ul>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2  mt-4 text-foreground/80">
              <p>
                <strong className="text-foreground">Brand:</strong> {staticData.brand}
              </p>
              <p>
                <strong className="text-foreground">Stock:</strong>{" "}
                {product.stockQuantity > 0
                    ? `${product.stockQuantity} available`
                    : "Out of stock"}
              </p>
              <p>
                <strong className="text-foreground">Colors:</strong>{" "}
                {/* Si tu as les couleurs côté backend, sinon statique */}
                Black, Blue, Orange
              </p>
              <p>
                <strong className="text-foreground">Tags:</strong>{" "}
                {staticData.tags.join(", ")}
              </p>
              <p>
                <strong className="text-foreground">Material:</strong> {staticData.material}
              </p>
              <p>
                <strong className="text-foreground">Weight:</strong> {staticData.weight}
              </p>
              <p>
                <strong className="text-foreground">Dimensions:</strong> {staticData.dimensions}
              </p>
              <p>
                <strong className="text-foreground">Warranty:</strong> {staticData.warranty}
              </p>
              <p>
                <strong className="text-foreground">Delivery:</strong> {staticData.deliveryInfo}
              </p>
              <p>
                <strong className="text-foreground">Returns:</strong> {staticData.returnPolicy}
              </p>
            </div>

            {/* Button */}
            <Button className="mt-4" size="lg">
              <ShoppingCart className="mr-2" /> Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
  );
}
