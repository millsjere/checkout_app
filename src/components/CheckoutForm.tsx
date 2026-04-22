import { useInitiatePayment } from '@gidayensu/checkout-sdk'; 
import React, { useState } from 'react';
import { CheckoutFormProps, PaymentFormData } from '../types';

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  onPaymentSuccess, 
  onPaymentError 
}) => {

 const {initiatePayment, transactionRef,} = useInitiatePayment({
    onSuccess: (transactionResponse)=> {
        onPaymentSuccess!(transactionRef);
        console.log('Payment successful with transaction response:', transactionResponse);
    },
    onFailure: ()=> {
        onPaymentError!(transactionRef);
        console.log('Payment failed');
    },
    onCancel: ()=> {
        console.log('Payment cancelled by user');
    },
    apiKey: process.env.REACT_APP_API_KEY || '',
    transflowId: process.env.REACT_APP_TRANSFLOW_ID || '',
    merchantProductId: process.env.REACT_APP_MERCHANT_PRODUCT_ID || '',
    pageTitle: 'Checkout Payment',
    currency: 'GHS',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeUYGFxgznznqSXV4r8m6iuAFBhX7FLbqOA&s',
    color: '#1E3A8A',

  });

  const [formData, setFormData] = useState<PaymentFormData>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initiatePayment({
      amount: formData.amount,
      email: formData.email,
      fullName: formData.name,
      phoneNumber: formData.phone,
    });
    console.log('Payment submission with data:', formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Payment</h1>
      <p className="text-gray-600 mb-8">Enter your details to complete payment</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="024 123 4567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (GHS)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₵</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData?.amount || ''}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105 mt-8"
        >
          Pay Now
        </button>
      </form>

      {/* Info message */}
      <div className="mt-2 p-2 rounded-lg">
        <p className="text-xs text-center text-blue-700">
          Payment processing via Transflow Checkout
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
