import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from 'react';

const AppLayout = () => {
  const { cartQuantity } = useCart();
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set to true if scrolled more than 10px, false otherwise
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`
          sticky top-0 z-50 transition duration-200 ease-in-out
          ${isScrolled ? 'shadow-lg bg-white-70 backdrop-blur-md' : 'shadow-none'}
        `}
      >
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

      <main className='grow'>
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