import { useCart } from "../../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const EmptyCart = () => (
  <div className="flex justify-center items-center min-h-screen px-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 text-center w-full max-w-md mx-auto">
      <FiShoppingCart className="text-7xl sm:text-8xl text-gray-400 mx-auto" />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
        Your Cart is Empty
      </h1>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Looks like you haven't added our amazing product yet.
      </p>
      <Link
        to="/"
        className="w-full block py-3 bg-indigo-600 text-white text-lg font-bold rounded-3xl
        hover:bg-indigo-700 hover:scale-105 transition duration-300"
      >
        Start Shopping
      </Link>
    </div>
  </div>
);

export const CartPage = () => {
  const {
    product,
    cartQuantity,
    updateCartQuantity,
    totalAmount,
    isLoading,
    error,
  } = useCart();

  const navigate = useNavigate();
  const [localQuantity, setLocalQuantity] = useState(cartQuantity.toString());

  useEffect(() => {
    if (error) {
      navigate("/backenderror", { state: { message: error } });
    }
  }, [error, navigate]);

  useEffect(() => {
    setLocalQuantity(cartQuantity.toString());
  }, [cartQuantity]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product || cartQuantity === 0) {
    return <EmptyCart />;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuantity(e.target.value);
  };

  const handleQuantityBlur = () => {
    const newQuantity = parseInt(localQuantity) || 0;

    // Double check stock (this check is in the provider too)
    if (newQuantity > product.stockQuantity) {
      updateCartQuantity(product.stockQuantity);
      setLocalQuantity(product.stockQuantity.toString());
    } else {
      updateCartQuantity(newQuantity);
      // If someone types e (js allows e as a number) convert it to 0
      setLocalQuantity(newQuantity.toString());
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/"
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

      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      <div className="bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                product.imageUrl || "https://via.placeholder.com/100x100.png"
              }
              alt={product.name}
              className="w-20 h-20"
            />
            <div>
              <h2 className="lg:text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)} each</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="flex mx-auto font-semibold">Quantity</span>
            <input
              type="number"
              min="1"
              max={product.stockQuantity}
              value={localQuantity}
              onChange={handleQuantityChange} // Use local state for onChange
              onBlur={handleQuantityBlur} // Use global state for onBlur
              className="w-20 rounded-4xl border-gray-300 text-center p-2"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-2xl flex flex-col items-end">
          <div className="text-2xl font-bold mb-4">
            <span>Total: </span>
            <span className="text-indigo-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {createPortal(
        // I use createPortal to stop unwanted behavior of fixed button in the entrance
        <button
          onClick={() => navigate("/checkout")}
          className="fixed bottom-10 right-10 lg:bottom-20 lg:right-20 px-8 py-3 bg-indigo-600 text-white text-sm lg:text-lg font-bold rounded-4xl
          hover:bg-indigo-700 hover:scale-102 transition duration-300 cursor-pointer"
        >
          Proceed to Checkout
        </button>,
        document.body
      )}
    </div>
  );
};

export default CartPage;
