import { createFileRoute } from '@tanstack/react-router'
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useNavigate } from "@tanstack/react-router";


export const Route = createFileRoute('/checkoutRoute')({
  component: RouteComponent,
})

function RouteComponent() {
    const { cartItems, removeFromCart, increaseCartQuantity, decreaseCartQuantity, getTotalPrice, clearCart, closeCart } = useShoppingCart();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        closeCart();
        navigate({ to: "/checkoutSuccessRoute" });
    }
    if (cartItems.length === 0) {
        return <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600">Please add some items to your cart before checking out.</p>
        </div>
    }
    return (
        <div className="flex flex-col max-w-2xl mx-auto p-6 h-full">
        <p className="text-2xl font-bold mb-4 border-b">Checkout</p>
        {cartItems.map(item => (
            <div key={item.id} className="flex items-center mb-4">
                {item.image && <img src={item.image.url} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Price: ${item.discountedPrice.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decreaseCartQuantity(item.id)}
                        className="px-2 py-0.5 border rounded text-sm"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseCartQuantity(item.id, {
                          title: item.title,
                          price: item.price,
                          discountedPrice: item.discountedPrice,
                          image: item.image,
                        })}
                        className="px-2 py-0.5 border rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                >
                    Remove
                </button>
            </div>
        ))}

       <div className='flex flex-row items-end gap-2 border-t pt-4'> 
            <div className="mt-6 flex justify-end items-center">
                <p className="text-xl font-bold mr-4">Total: ${getTotalPrice().toFixed(2)}</p>
                <button
                        onClick={() => {
                            handlePlaceOrder();
                            clearCart();
                        }}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Place Order
                </button>
            </div>
            <div className="mt-6 flex justify-end items-center">
                <button
                    onClick={() => {
                        clearCart();
                        navigate({ to: "/productsRoute" });
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Clear Cart
                </button>

            </div>
      </div>
  </div>
)}
