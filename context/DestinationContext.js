"use client";
import { createContext, useState } from 'react';

export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [destination, setDestination] = useState({ name: '', lat: null, lng: null });
  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
