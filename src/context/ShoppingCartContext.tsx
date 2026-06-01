/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

const CART_STORAGE_KEY = "shopping-cart";
const CART_EXPIRY_MS = 1000 * 60 * 60; // This is 1 hour, remember!

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const { items, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CART_EXPIRY_MS) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
    return items as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify({ items, timestamp: Date.now() }),
  );
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: string;
  quantity: number;
  title: string;
  price: number;
  discountedPrice: number;
  image?: { url: string };
};

type ProductInfo = {
  title: string;
  price: number;
  discountedPrice: number;
  image?: { url: string };
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string, product: ProductInfo) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export default function ShoppingCartProvider({
  children,
}: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);
  const [, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0,
  );

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string, product: ProductInfo) {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem == null) {
      setCartItems((currItems) => [...currItems, { id, quantity: 1, ...product }]);
      toast.success(`${product.title} added to cart`, {
        description: `Price: ${formatPrice(product.discountedPrice)}`,
      });
      return;
    }

    setCartItems((currItems) =>
      currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );

    toast.success(`${product.title} quantity updated`, {
      description: "Added one more to your cart.",
    });
  }

  function decreaseCartQuantity(id: string) {
    const targetItem = cartItems.find((item) => item.id === id);
    if (!targetItem) {
      return;
    }

    if (targetItem.quantity === 1) {
      setCartItems((currItems) => currItems.filter((item) => item.id !== id));
      toast.info(`${targetItem.title} removed from cart`, {
        description: "Quantity reached zero.",
      });
      return;
    }

    setCartItems((currItems) =>
      currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );

    toast.info(`${targetItem.title} quantity updated`, {
      description: "Removed one from your cart.",
    });
  }
  function removeFromCart(id: string) {
    const targetItem = cartItems.find((item) => item.id === id);
    if (!targetItem) {
      return;
    }

    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    toast.info(`${targetItem.title} removed from cart`);
  }
  function clearCart() {
    if (cartItems.length === 0) {
      return;
    }

    setCartItems([]);
    toast.info("Purchase completed", {
      description: "Your shopping cart is now empty.",
    });
  }
  function getTotalPrice() {
    return cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    );
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
