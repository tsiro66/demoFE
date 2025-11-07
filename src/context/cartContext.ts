import { createContext } from "react";
import type { Product } from "../types";

export interface CartContextState {
    product: Product | null;
    isLoading: boolean;
    error: string | null;
    // State for product page
    selectedQuantity: number;
    setSelectedQuantity: (qunatity: number) => void;

    // State for the actual cart
    cartQuantity: number;
    updateCartQuantity: (quantity: number) => void;
    addToCart: () => void;

    totalAmount: number;
}

export const CartContext = createContext<CartContextState | undefined>(undefined);
