export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
}

export interface OrderRequest {
  productId: number;
  quantity: number;
  email: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  paymentToken: string;
}

export interface OrderResponse {
  id: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;

  customer: {
    id: number;
    firstName: string;
    email: string;
  };

  items: {
    id: number;
    quantity: number;
    unitPrice: number;
  }[];
}
export interface BackendErrorPageProps {
  error: BackendError;
}

type BackendError = {
  message: string;
  status?: number;
  timestamp?: string; 
  details?: string;
}

export interface EventPayload {
    eventName: string;
    payload: Record<string, unknown>;
    timestamp: string;
}
// Status Enum
export type OrderStatus = "PROSSESING" | "SHIPPED";
