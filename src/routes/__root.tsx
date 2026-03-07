import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ to: "/homeRoute" });
    }
  },
});
