import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from "@tanstack/react-router";


export const Route = createFileRoute('/checkoutSuccessRoute')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
  return <div className= "flex flex-col pt-10 items-center justify-center h-full">
    <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
    <p className="text-gray-600">Your order has been placed successfully. We will send you a confirmation email shortly.</p>
    <button
      onClick={() => {
        navigate({ to: "/productRoute" });
      }}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Back to Products
    </button>
  </div>
}
