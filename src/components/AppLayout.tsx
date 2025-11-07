import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../hook/useCart'; // Check your path, e.g., ../hooks/useCart
import { FiShoppingCart } from "react-icons/fi";

const AppLayout = () => {
  // Use cartQuantity for the icon
  const { cartQuantity } = useCart(); // We don't need 'product' here anymore

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link to="/" className='text-3xl font-extrabold text-indigo-600'>
            SmartWatch
          </Link>

          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
            <FiShoppingCart className='text-2xl'/>
            {cartQuantity > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            )}
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
          &copy; 2025 Your Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;