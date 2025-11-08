import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { CartProvider } from "./context/CartProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.tsx";
import NotFound from "./components/pages/NotFoundPage.tsx";
import AppLayout from "./components/AppLayout.tsx";
import CartPage from "./components/pages/CartPage.tsx";
import CheckoutPage from "./components/pages/CheckoutPage.tsx";
import ConfirmationPage from "./components/pages/ConfirmationPage.tsx";
import { AnimatedOutlet } from "./components/AnimatedOutlet.tsx";
import BackendErrorPage from "./components/pages/BackendErrorPage.tsx";

const router = createBrowserRouter([
  {
    element: <AnimatedOutlet />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <LandingPage />,
          },
        ],
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "/backenderror",
        element: <BackendErrorPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  </StrictMode>
);
