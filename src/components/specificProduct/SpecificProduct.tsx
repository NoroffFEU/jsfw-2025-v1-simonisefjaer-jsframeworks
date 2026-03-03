import React from "react";
import { Button } from "../ui/button";

interface SpecificProductCardProps {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
    rating?: number;
    description?: string;
}

export default function SpecificProductCard({ id, title, price, discountedPrice, imageUrl, rating, description }: SpecificProductCardProps) {
   return (
    <div className="border rounded-lg overflow-hidden shadow-md p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-500 line-through mb-1">Price: ${price.toFixed(2)}</p>
      <p className="text-green-500 font-bold">Discounted Price: ${discountedPrice.toFixed(2)}</p>
      <p className="text-yellow-500 font-bold">Rating: {rating ? rating : "N/A"}</p>
      <img src={imageUrl} alt={title} className="w-lg max-h-150 object-cover mt-4 border-5" />
      <p className="mt-4 text-white">{description ? description : "No description available"}</p>
           
      <Button className="mt-4" size="lg">
        Add to Cart
      </Button>
    </div>
  );
};


