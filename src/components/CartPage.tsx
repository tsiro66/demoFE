import { useCart } from "../hook/useCart";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export const CartPage = () => {
  const { product, cartQuantity, updateCartQuantity, totalAmount, isLoading } =
    useCart();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-8 text-center">Loading Cart...</div>;
  }

  if (!product || cartQuantity === 0) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div className="bg-white shadow-xl rounded-2xl p-12 text-center max-w-lg mx-auto">
            <FiShoppingCart className="text-8xl text-gray-400 mx-auto"/>

            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
                Looks like you haven't added our amazing product yet.
            </p>
            <Link
                to="/"
                className="w-full inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-lg hover:bg-indigo-700 transition"
            >
                Start Shopping
            </Link>
        </div>
    </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </Link>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      <div className="bg-white shadow-xl rounded-2xl">
        {/* Cart Item */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                product.imageUrl || "https://via.placeholder.com/100x100.png"
              }
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)} each</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-x-4">
            <span className="font-semibold">Quantity</span>
            <input
              type="number"
              min="1"
              max={product.stockQuantity}
              value={cartQuantity}
              onChange={(e) => updateCartQuantity(Number(e.target.value))}
              className="w-20 rounded-md border-gray-300 text-center p-2"
            />
          </div>
        </div>

        {/* Cart Summary & Checkout Button */}
        <div className="p-6 bg-gray-50 rounded-b-2xl flex flex-col items-end">
          <div className="text-2xl font-bold mb-4">
            <span>Total: </span>
            <span className="text-indigo-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="fixed bottom-10 right-10 lg:bottom-20 lg:right-60 px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-lg hover:bg-indigo-700 transition"
      >
        Proceed to Checkout
      </button>
      
    </div>
  );
};

export default CartPage;
