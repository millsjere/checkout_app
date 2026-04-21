/**
 * Types for the Payment application
 * These will be extended with SDK types in Phase 2
 */

export interface PaymentFormData {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export interface CheckoutFormProps {
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: any) => void;
}

// Placeholder for SDK types - will be imported from @gidayensu/checkout-sdk in Phase 2
export interface CheckoutSDKConfig {
  apiKey?: string;
  // Additional SDK configuration will be added here
}
