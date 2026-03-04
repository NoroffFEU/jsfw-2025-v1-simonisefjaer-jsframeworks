import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard/ProductCard";
import { getOnlineShopProducts } from "../api/onlineShop";

export const Route = createFileRoute("/productRoute")({
  component: RouteComponent,
});

function RouteComponent() {
  const matchRoute = useMatchRoute();
  const isDetailRoute = Boolean(
    matchRoute({ to: "/productRoute/$id", fuzzy: false }),
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getOnlineShopProducts,
    enabled: !isDetailRoute,
  });

  if (isDetailRoute) {
    return <Outlet />;
  }

  if (isLoading) {
    return <p className="px-4 py-6 text-gray-600">Loading products...</p>;
  }

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    return <p className="px-4 py-6 text-red-600">{message}</p>;
  }

  const products = data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl  font-semibold">Products</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            discountedPrice={product.discountedPrice}
            rating={product.rating}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
