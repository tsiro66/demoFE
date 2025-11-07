import axios, { AxiosError } from "axios";
import type { OrderRequest, OrderResponse, Product } from "../types";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 5000,
});

/**
 * Fetches the details of the single product (ID 1).
 * @returns {Promise<Product>}
 */
export async function getProduct(): Promise<Product> {
    try {
        const response = await apiClient.get<Product>('/product');
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error)

        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error("Product not found.(Check database for ID 1)");
        }

        throw new Error("Could not connect to the store. Please check the server.")
    }
}

/**
 * Submits the checkout request to the backend.
 * @param {OrderRequest} orderData The payload containing customer and order details.
 * @returns {Promise<OrderResponse>} The created order object.
 */
export async function placeOrder(orderData: OrderRequest): Promise<OrderResponse> {
    try {
        const response = await apiClient.post<OrderResponse>('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;

            if (axiosError.response?.status === 400) {
                const backendErrorMessage = axiosError.response.data?.message;
                throw new Error(backendErrorMessage || 'Order failed: Check quantity or details.')
            }
        }

        throw new Error("Order placement failed. Please try again later.");
    }
}
