import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState('No Origin Selected');
  const [destination, setDestination] = useState('No Destination Selected');
  const amount = searchParams.get('amount') || 0; // Price in dollars
  const userId = 'someUserId123'; // Replace with actual user ID logic

  // Load origin and destination from localStorage when component mounts
  useEffect(() => {
    const savedOrigin = JSON.parse(localStorage.getItem('origin'));
    const savedDestination = JSON.parse(localStorage.getItem('destination'));

    if (savedOrigin) {
      setOrigin(savedOrigin.name);
    }

    if (savedDestination) {
      setDestination(savedDestination.name);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      console.error('Stripe or Elements is not loaded.');
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error('Error submitting elements:', submitError);
      return;
    }

    const amountInCents = Math.round(amount * 100);

    // Prepare the payload to be sent to the backend
    const requestData = {
      newAmount: amountInCents,
      origin, // Use the value from localStorage or context
      destination, // Use the value from localStorage or context
      userId, // Include user ID
    };

    console.log('Data being sent to /api/create-intent:', requestData);

    try {
      const res = await fetch('/api/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const jsonResponse = await res.json();
      console.log('Response from /api/create-intent:', jsonResponse);

      if (!jsonResponse.clientSecret) {
        console.error('Error creating payment intent:', jsonResponse);
        return;
      }

      // Step 2: Confirm payment with Stripe
      const { error } = await stripe.confirmPayment({
        clientSecret: jsonResponse.clientSecret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/payment-confirmation',
        },
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        return;
      }

      console.log('Payment confirmed successfully!');
    } catch (networkError) {
      console.error('Network or API error:', networkError);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-6'>
      <h2 className='m-5 font-bold'>Amount to Pay: ${amount}</h2>
      <p>From: {origin}</p>
      <p>To: {destination}</p>

      <form onSubmit={handleSubmit} className='max-w-md'>
        <PaymentElement />
        <button type="submit" className='w-full bg-black text-white p-2 rounded-lg mt-2'>Pay</button>
      </form>
    </div>
  );
}

export default CheckoutForm;
