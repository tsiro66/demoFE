// src/components/CheckoutForm.tsx

import React, { useState } from 'react';
import { useCart } from '../hook/useCart';
import { placeOrder } from '../api/orderApi';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import type { OrderRequest } from '../types';

// Define the initial state for the form
const initialFormData: Omit<OrderRequest, 'productId' | 'quantity' | 'paymentToken'> = {
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    zipCode: '',
};

export const CheckoutForm = () => {
    const { product, cartQuantity, totalAmount } = useCart();
    const navigate = useNavigate(); // Hook for programmatic navigation

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- This is the core submission logic ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || cartQuantity <= 0) return;

        setIsSubmitting(true);
        setSubmissionError(null);

        // 1. Assemble the OrderRequest object
        const orderRequestData: OrderRequest = {
            ...formData,
            productId: product.id,
            quantity: cartQuantity,
            paymentToken: 'MOCK_TOKEN_FOR_DEMO', // The mock payment token
        };

        try {
            // 2. Call the API
            const orderResponse = await placeOrder(orderRequestData);

            // 3. Success! Navigate to the confirmation page
            console.log('Order successful:', orderResponse);
            navigate('/confirmation'); // <-- Redirect on success

        } catch (error) {
            // 4. Handle API errors (e.g., out of stock)
            if (error instanceof Error) {
                setSubmissionError(error.message);
            } else {
                setSubmissionError('An unknown error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
                Shipping & Payment
            </h3>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Email */}
            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />

            {/* Address */}
            <input type="text" name="streetAddress" placeholder="Street Address" required value={formData.streetAddress} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />
                <input type="text" name="zipCode" placeholder="Zip Code" required value={formData.zipCode} onChange={handleChange} className="p-3 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Payment (Mocked) */}
            <div className="pt-2">
                <p className="text-lg font-semibold mb-2">Payment Details</p>
                <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm">
                    Mock payment. No card details required.
                </div>
            </div>

            {/* Error Message */}
            {submissionError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    <strong>Error:</strong> {submissionError}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white p-4 rounded-lg text-lg font-bold hover:bg-indigo-700 hover:scale-102 transition duration-150
                 disabled:bg-indigo-300 cursor-pointer"
            >
                {isSubmitting ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
            </button>
        </form>
    );
};