import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useTracking } from '../hooks/useTracking';

export const ProductDisplay = () => {
    const { product, selectedQuantity, setSelectedQuantity, addToCart, isLoading } = useCart();
    const [showAdded, setShowAdded] = useState(false);
    const trackEvent = useTracking();

    const handleAddToCart = () => {
        trackEvent('add_to_cart', {
            productId: product?.id,
            quantity: selectedQuantity
        });

        addToCart();

        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 1500);
    };

    if (isLoading || !product) return null;

    return (
        <div className="grid lg:grid-cols-3 lg:gap-30 items-center">

            <div className='flex justify-center lg:col-span-1'>
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/800x600.png?text=Product+Image'}
                    alt={product.name}
                    className="max-w-56 lg:max-w-sm h-auto"
                />
            </div>

            <div className="space-y-6 mt-12 lg:mt-0 lg:col-span-2">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{product.name}</h2>
                <span className="block text-4xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                </span>
                <p className="lg:text-xl text-gray-600">{product.description}</p>

                <div className="border-t border-gray-200 pt-6 space-y-4">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="quantity" className="text-base font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max={product.stockQuantity}
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                            className="w-20 rounded-4xl border-gray-300 shadow-lg text-center p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {product.stockQuantity <= 10 && (
                            <span className="text-sm text-red-600">Only {product.stockQuantity} left!</span>
                        )}
                    <button
                        onClick={handleAddToCart}
                        disabled={showAdded}
                        className="w-full bg-indigo-600 text-white p-2 rounded-4xl text-lg font-bold hover:bg-indigo-700 shadow-lg
                        transition hover:scale-102 hover:shadow-xl duration-300 ease-in-out cursor-pointer disabled:bg-green-500"
                    >
                        {showAdded ? "Added to Cart!" : "Add to Cart"}
                    </button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};