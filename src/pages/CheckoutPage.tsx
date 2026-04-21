import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

/**
 * CheckoutPage Component
 * 
 * Simple payment page with centered payment form
 */
const CheckoutPage: React.FC = () => {
  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    // Handle success - redirect, show confirmation, etc.
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    // Handle error - show error message, retry, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center px-4">
      {/* Payment Form Container */}
      <div className="w-full max-w-md">
        <CheckoutForm
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© 2026 IT Consortium Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
