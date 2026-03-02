import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface SpecificProductCardProps {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
}

const SpecificProductCard = ({ id, title, price, discountedPrice, imageUrl }: SpecificProductCardProps) => {

}