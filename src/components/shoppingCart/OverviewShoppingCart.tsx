import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";



export default function OverviewShoppingCart() {
  const { cartItems, cartQuantity, removeFromCart, increaseCartQuantity, decreaseCartQuantity, getTotalPrice, clearCart } =
    useShoppingCart();
  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleCheckout = () => {
    setOpen(false);
    navigate({ to: "/checkoutRoute" });
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View shopping cart</span>
          <ShoppingCart aria-hidden="true" className="size-6" />
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartQuantity}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Your cart is empty"
              : `You have ${cartItems.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No items in cart
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.title ?? "Unknown product"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 text-xs"
                        onClick={() => decreaseCartQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 text-xs"
                        onClick={() => increaseCartQuantity(item.id, {
                          title: item.title,
                          price: item.price,
                          discountedPrice: item.discountedPrice,
                          image: item.image,
                        })}
                      >
                        +
                      </Button>
                    </div>
                    <p className="font-bold">
                      ${(item.discountedPrice ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="flex-col gap-2 sm:gap-4">
          <div className="flex justify-between items-center w-full text-base sm:text-lg font-bold">
            <span>Total:</span>
            <span>${(getTotalPrice?.() ?? 0).toFixed(2)}</span>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10"
              onClick={clearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </Button>
            <SheetClose asChild>
              <Button
                className="flex-1 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-white"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
