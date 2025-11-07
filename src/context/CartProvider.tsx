import { useEffect, useState, type ReactNode } from "react";
import { getProduct } from "../api/orderApi";
import { CartContext, type CartContextState } from "./cartContext";
import type { Product } from "../types";

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const loadPoduct = async () => {
            try {
                const productData = await getProduct();
                setProduct(productData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occured.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadPoduct();
    }, [])

    const addToCart = () => {
        if (!product) return;

        const currentInCart = cartQuantity;
        const toAdd = selectedQuantity;
        const newTotalInCart = currentInCart + toAdd;
        const maxStock = product.stockQuantity;

        if (newTotalInCart >= maxStock) {
            setCartQuantity(maxStock);
        } else {
            setCartQuantity(newTotalInCart);
        }
    };

   const updateCartQuantity = (newQuantity: number) => {
        if (!product) return;
        
        if (newQuantity <= 0) {
            setCartQuantity(0);
        } else if (newQuantity > product.stockQuantity) {
            setCartQuantity(product.stockQuantity);
        } else {
            setCartQuantity(newQuantity);
        }
    };

    const totalAmount = product ? product.price * cartQuantity : 0;

    const value: CartContextState = {
        product,
        isLoading,
        error,
        selectedQuantity,
        setSelectedQuantity,
        cartQuantity,
        updateCartQuantity,
        addToCart,
        totalAmount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
