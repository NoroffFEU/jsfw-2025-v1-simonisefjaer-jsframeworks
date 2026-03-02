import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";



interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, discountedPrice, imageUrl }) => {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

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
                <p className="text-green-500 font-bold">${discountedPrice.toFixed(2)}</p>
                <button
                    type="button"
                    onClick={handleViewDetails}
                    disabled={isNavigating}
                    aria-busy={isNavigating}
                    className="mt-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isNavigating ? "Loading..." : "View details"}
                </button>
            </div>
        </div>
    );
}
    

export default ProductCard;