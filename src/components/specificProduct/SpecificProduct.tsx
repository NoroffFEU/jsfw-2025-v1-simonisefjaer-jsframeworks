import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useShoppingCart } from "@/context/ShoppingCartContext";

type ProductReview = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

interface SpecificProductCardProps {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating?: number;
  description?: string;
  tags?: string[];
  reviews?: ProductReview[];
}

export default function SpecificProductCard({
  id,
  title,
  price,
  discountedPrice,
  imageUrl,
  rating,
  description,
  tags = [],
  reviews = [],
}: SpecificProductCardProps) {
  const navigate = useNavigate();
  const { increaseCartQuantity, getItemQuantity } = useShoppingCart();

  const discountAmount = Math.max(0, price - discountedPrice);
  const discountPercent = price > 0 ? Math.round((discountAmount / price) * 100) : 0;
  const cartQuantity = getItemQuantity(id);
  const formattedRating = typeof rating === "number" ? rating.toFixed(1) : "N/A";

  const reviewSummary = useMemo(() => {
    if (reviews.length === 0) {
      return { average: 0, total: 0 };
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      average: total / reviews.length,
      total: reviews.length,
    };
  }, [reviews]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-linear-to-br from-amber-50 via-white to-rose-50 shadow-lg">
        <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-8">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <img
              src={imageUrl}
              alt={title}
              className="h-80 w-full rounded-lg object-cover md:h-115"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                Featured Pick
              </span>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-600">Product ID: {id}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-emerald-700">
                  ${discountedPrice.toFixed(2)}
                </p>
                <p className="pb-1 text-lg text-slate-500 line-through">
                  ${price.toFixed(2)}
                </p>
              </div>
              <p className="mt-2 text-sm font-medium text-rose-700">
                Save ${discountAmount.toFixed(2)} ({discountPercent}% off)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Product Rating</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{formattedRating}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Customer Reviews</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {reviewSummary.total > 0
                    ? `${reviewSummary.average.toFixed(1)} (${reviewSummary.total})`
                    : "No reviews yet"}
                </p>
              </div>
            </div>

            <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
              {description ?? "No description available."}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  increaseCartQuantity(id, {
                    title,
                    price,
                    discountedPrice,
                    image: { url: imageUrl },
                  })
                }
                className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                {cartQuantity > 0 ? `Add another (${cartQuantity} in cart)` : "Add to cart"}
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/productRoute" })}
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to products
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-100 bg-white/80 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900">What customers are saying</h2>
          {reviews.length === 0 ? (
            <p className="mt-2 text-slate-600">No customer reviews yet. Be the first to share your experience.</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {reviews.slice(0, 4).map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{review.username}</p>
                    <p className="text-sm font-medium text-amber-700">{review.rating.toFixed(1)} / 5</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{review.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
