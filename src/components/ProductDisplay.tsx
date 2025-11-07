import React, { useState } from 'react';
import { useCart } from '../hook/useCart';

export const ProductDisplay: React.FC = () => {
    // Get the new state and functions
    const { product, selectedQuantity, setSelectedQuantity, addToCart, isLoading } = useCart();
    const [showAdded, setShowAdded] = useState(false);

    const handleAddToCart = () => {
        // 1. Add the items to the cart state
        addToCart();

        // 2. (Optional) Show a "Added!" message
        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 1500); // Hide after 1.5s
        
        // 3. Navigate to the cart page as before
        // We delay navigation slightly so the user sees the icon update

    };

    if (isLoading || !product) return null;

    return (
        <div className="grid lg:grid-cols-5 lg:gap-16 items-center">
            {/* Left Column: Product Image */}
            <div className='flex justify-center lg:justify-end lg:col-span-2'>
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/800x600.png?text=Product+Image'}
                    alt={product.name}
                    className="max-w-2xs lg:max-w-sm h-auto object-cover"
                />
            </div>

            {/* Right Column: Product Details & Actions */}
            <div className="space-y-6 mt-12 lg:mt-0 lg:col-span-3">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{product.name}</h2>
                <span className="block text-4xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                </span>
                <p className="lg:text-xl text-gray-600">{product.description}</p>

                <div className="border-t border-gray-200 pt-6 space-y-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3">
                        <label htmlFor="quantity" className="text-base font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max={product.stockQuantity > 10 ? 10 : product.stockQuantity}
                            // Use selectedQuantity and setSelectedQuantity
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                            className="w-20 rounded-md border-gray-300 shadow-sm text-center p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {product.stockQuantity <= 10 && (
                            <span className="text-sm text-red-600">Only {product.stockQuantity} left!</span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={showAdded} // Disable button briefly after click
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg text-lg font-bold hover:bg-indigo-700 transition hover:scale-102 duration-300 ease-in-out cursor-pointer disabled:bg-green-500"
                    >
                        {showAdded ? "Added to Cart!" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};