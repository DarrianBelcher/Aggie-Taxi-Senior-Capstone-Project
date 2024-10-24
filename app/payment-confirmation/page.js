"use client"; // Add this directive at the top

import React, { useState, useEffect } from 'react';

function PaymentConfirmation() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); // Add dots every half second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Looking for a driver{dots}</h1>
        <p className="text-gray-600">We’re finding the nearest available driver for your ride.</p>

        {/* Animated car/driver loader */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>

        <p className="text-gray-500 mt-6">Sit tight, this might take a few seconds...</p>
      </div>
    </div>
  );
}

export default PaymentConfirmation;
