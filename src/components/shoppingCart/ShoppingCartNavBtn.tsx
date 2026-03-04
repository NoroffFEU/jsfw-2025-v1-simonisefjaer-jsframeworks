import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function ShoppingCartNavBtn() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <div>
      <button
        onClick={openCart}
        type="button"
        className="relative ml-2 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View shopping cart</span>
        <ShoppingCart aria-hidden="true" className="size-6" />
        {cartQuantity > 0 && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cartQuantity}
          </div>
        )}
      </button>
    </div>
  );
}
