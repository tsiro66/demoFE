import { useEffect, useState, type ReactNode } from "react";
import { getProduct } from "../api/orderApi";
import { CartContext, type CartContextState } from "./cartContext";
import type { Product } from "../types";

const CART_STORAGE_KEY = "myAppCartQuantity";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(() => {
    const storedQty = localStorage.getItem(CART_STORAGE_KEY);
    return storedQty ? Number(storedQty) : 0;
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, cartQuantity.toString());
  }, [cartQuantity]);

  useEffect(() => {
    const loadPoduct = async () => {
      try {
        const productData = await getProduct();
        setProduct(productData);

        if (cartQuantity > productData.stockQuantity) {
          setCartQuantity(productData.stockQuantity);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occured.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPoduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
