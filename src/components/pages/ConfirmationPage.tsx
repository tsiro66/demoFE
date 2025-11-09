import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { FaRegCheckCircle } from "react-icons/fa";

const ConfirmationPage = () => {
  const { updateCartQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    updateCartQuantity?.(0);
  }, [updateCartQuantity, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg text-center m-4">
        <FaRegCheckCircle className="text-7xl text-green-500 mx-auto" />

        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. We've received your order and will send a
          confirmation email with your receipt shortly.
        </p>

        <Link
          to="/"
          className="w-full inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-4xl
           hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
