import React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
     </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})


