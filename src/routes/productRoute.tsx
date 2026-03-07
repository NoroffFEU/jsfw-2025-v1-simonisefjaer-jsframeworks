import { createFileRoute, Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard/ProductCard";
import { getOnlineShopProducts } from "../api/onlineShop";
import { Input } from "@/components/ui/input";

type ProductSearch = {
  page?: number;
};

export const Route = createFileRoute("/productRoute")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    page: Number(search.page) || 1,
  }),
});

const PRODUCTS_PER_PAGE = 12;

function RouteComponent() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const page = Number(search.page) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const isDetailRoute = Boolean(
    matchRoute({ to: "/productRoute/$id", fuzzy: false }),
  );

  // When searching, fetch all products; otherwise use pagination
  const isSearching = searchTerm.trim().length > 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: isSearching ? ["products", "all"] : ["products", page],
    queryFn: () =>
      isSearching
        ? getOnlineShopProducts(1, 100)
        : getOnlineShopProducts(page, PRODUCTS_PER_PAGE),
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

  const allProducts = data?.data ?? [];
  const meta = data?.meta;

  // Filter products client-side when searching
  const products = isSearching
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      )
    : allProducts;

  const goToPage = (newPage: number) => {
    navigate({ to: "/productRoute", search: { page: newPage } });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {products.length === 0 && !isLoading && (
        <p className="mt-6 text-muted-foreground">
          No products found for &quot;{searchTerm}&quot;.
        </p>
      )}

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

      {!isSearching && meta && meta.pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={meta.isFirstPage}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: meta.pageCount }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`rounded border px-3 py-1 text-sm ${
                  pageNum === page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={meta.isLastPage}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
