import { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { useTracking } from "../../hooks/useTracking";
import { CheckoutForm } from "../CheckoutForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const CheckoutPage = () => {
  const { product, cartQuantity, totalAmount, isLoading, error } = useCart();
  const trackEvent = useTracking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && product && cartQuantity > 0) {
      trackEvent("begin_checkout", {
        page: "CheckoutPage",
        productId: product.id,
        quantity: cartQuantity,
        total: totalAmount,
      });
    }
  }, [isLoading, product, cartQuantity, totalAmount, trackEvent]);

  useEffect(() => {
    if (error) {
      navigate("/backenderror", { state: { message: error } });
    }
  }, [error, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product || cartQuantity === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/cart"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition mb-4 group"
      >
        <svg
          className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Link>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-xl h-fit">
          <h2 className="text-2xl font-bold mb-6 pb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={
                  product.imageUrl || "https://via.placeholder.com/100x100.png"
                }
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">Quantity: {cartQuantity}</p>
              </div>
            </div>
            <span className="font-semibold">
              ${(product.price * cartQuantity).toFixed(2)}
            </span>
          </div>

          <div className=" pt-4 mt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
