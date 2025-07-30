import CommentsUser from "@/components/shared/comments-user";
import SimilarProducts from "@/components/shared/similar-products";
import { Product } from "@/types";
import { Rating } from "@/components/shared/rating";
import { ImageProduct } from "./image-product";
import { getSingleProduct } from "@/app/actions/product-actions";
import RecentlyViewed from "./recently-viewed";
import AddToCartButton from "@/components/shared/add-to-cart";
import { notFound } from "next/navigation";




export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await getSingleProduct(Number(id));

  if ("message" in res) {
    return  notFound(); 
  }


  const product: Product = res as Product;


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

        <ImageProduct imageUrls={product.imageUrls} name={product.name} />
        {/* Product Info */}
        <div className="flex-1 min-w-sm space-y-4">
          <h1 className="sm:text-5xl text-4xl font-semibold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">
            {product.category?.name} • SKU: TRL-001-LOGI
          </p>

          {/* Rating */}
          <Rating rating={product.rating} />

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
              <strong className="text-foreground">Colors:</strong>{' '}
              {product.colors && product.colors.length > 0 ? product.colors.join(', ') : 'No colors'}
            </p>

            <p>
              <strong className="text-foreground">Tags:</strong> {staticData.tags.join(", ")}
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
          <AddToCartButton className="w-fit" productId={product.id} />
        </div>
      </div>

      <SimilarProducts id={product.id} />

      <RecentlyViewed product={product} />

      <CommentsUser productId={product.id} />
    </div>
  );
}
