import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@headlessui/react'
export const Route = createFileRoute('/homeRoute')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-6 gap-3">
      <h1 className="text-4xl font-bold mb-4">Welcome to the demo NORShop!</h1>
      <p className="text-lg text-gray-400 mb-8">
        Explore our wide range of products and find the best deals for you.
      </p>
      <p className="text-lg text-gray-400 mb-8">Go there now!</p>
      <Button>
        
        <Link to="/productRoute">Products</Link>
      </Button>
    </div>
  )
}
