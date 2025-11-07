import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { CartProvider } from "./context/CartProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import NotFound from "./components/NotFound.tsx";
import AppLayout from "./components/AppLayout.tsx";
import CartPage from "./components/CartPage.tsx";
import CheckoutPage from "./components/CheckoutPage.tsx";
import ConfirmationPage from "./components/ConfirmationPage.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
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
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  </StrictMode>
);
