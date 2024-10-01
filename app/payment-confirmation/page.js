import React from 'react';

function PaymentConfirmation() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p>Your payment has been confirmed.</p>
      <a href="/" className="mt-4 text-blue-600 underline">Go to Home</a>
    </div>
  );
}

export default PaymentConfirmation;
