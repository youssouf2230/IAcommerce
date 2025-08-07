import CommentsUser from "@/components/shared/comments-user";
import SimilarProducts from "@/components/shared/similar-products";
import { Product } from "@/types";
import { Rating } from "@/components/shared/rating";
import { ImageProduct } from "./image-product";
import { getSingleProduct } from "@/actions/product-actions";
import RecentlyViewed from "./recently-viewed";
import AddToCartButton from "@/components/shared/add-to-cart";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getSingleProduct(Number(id));

  if ("message" in res) {
    return notFound();
  }

  const product: Product = res as Product;

  // Calcul du discount si oldPrice existe
  const discount =
      product.oldPrice && product.sellPrice
          ? `${Math.round(100 - (product.sellPrice / product.oldPrice) * 100)}%`
          : null;

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
              {product.oldPrice && (
                  <>
                <span className="line-through text-muted-foreground">
                  {product.oldPrice} €
                </span>
                    {discount && (
                        <span className="text-red-500 font-medium">{discount} OFF</span>
                    )}
                  </>
              )}
            </div>

            {/* Description */}
            <p className="sm:text-2xl text-lg font-medium text-foreground">
              {product.description}
            </p>

            {/* Features */}
            <ul className="list-disc pl-5 text-foreground/80">
              {product.features?.length
                  ? product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                  ))
                  : <li>No features listed.</li>}
            </ul>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-foreground/80">
              <p>
                <strong className="text-foreground">Brand:</strong>{" "}
                {product.brand || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Stock:</strong>{" "}
                {product.stockQuantity > 0
                    ? `${product.stockQuantity} available`
                    : "Out of stock"}
              </p>
              <p>
                <strong className="text-foreground">Colors:</strong>{" "}
                {product.colors?.length ? product.colors.join(", ") : "No colors"}
              </p>
              <p>
                <strong className="text-foreground">Tags:</strong>{" "}
                {product.tags?.length ? product.tags.join(", ") : "No tags"}
              </p>
              <p>
                <strong className="text-foreground">Material:</strong>{" "}
                {product.material || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Weight:</strong>{" "}
                {product.weight || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Dimensions:</strong>{" "}
                {product.dimensions || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Warranty:</strong>{" "}
                {product.warranty || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Delivery:</strong>{" "}
                {product.deliveryInfo || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Returns:</strong>{" "}
                {product.returnPolicy || "N/A"}
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
