import { createFileRoute } from "@tanstack/react-router";
import SpecificProductCard from "../components/specificProduct/SpecificProduct";
import { getOnlineShopDetails } from "@/api/onlineShop";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/productRoute/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/productRoute/$id" });

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOnlineShopDetails(id),
  });

  if (isLoading)
    return <p className="px-4 py-6 text-gray-600">Loading products...</p>;
  if (isError) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    return <p className="px-4 py-6 text-red-600">{message}</p>;
  }

  if (!product)
    return <p className="px-4 py-6 text-gray-600">Product not found</p>;

  return (
    <SpecificProductCard
      id={product.id}
      title={product.title}
      price={product.price}
      discountedPrice={product.discountedPrice}
      rating={product.rating}
      imageUrl={product.image.url}
      description={product.description}
    />
  );
}
