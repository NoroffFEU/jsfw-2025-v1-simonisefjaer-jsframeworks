import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useShoppingCart } from "../../context/ShoppingCartContext";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating?: number;
}

const ProductCard = ({
  rating,
  id,
  title,
  price,
  discountedPrice,
  imageUrl,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const { increaseCartQuantity } = useShoppingCart();
  const handleViewDetails = () => {
    if (isNavigating) {
      return;
    }

    setIsNavigating(true);
    navigate({ to: "/productRoute/$id", params: { id } });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-500 line-through mb-1">${price.toFixed(2)}</p>
        <p className="text-green-500 font-bold">
          ${discountedPrice.toFixed(2)}
        </p>
        <p className="text-yellow-500 font-bold">
          Rating: {rating ? rating : "N/A"}
        </p>
        <div className="flex flex-row items-start mt-4 gap-2">
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={isNavigating}
            aria-busy={isNavigating}
          >
            {isNavigating ? "Loading..." : "View details"}
          </button>
          <div className="mt-auto">
            <button
              onClick={() =>
                increaseCartQuantity(id, {
                  title,
                  price,
                  discountedPrice,
                  image: { url: imageUrl },
                })
              }
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
