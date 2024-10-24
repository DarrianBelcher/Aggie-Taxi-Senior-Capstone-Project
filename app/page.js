"use client"; // Make this a client component

import { LoadScript } from "@react-google-maps/api";
import GoogleMapsSection from "../components/Home/GoogleMapsSection";
import SearchSection from "../components/Home/SearchSection";
import { DestinationContext } from "../context/DestinationContext"; 
import { SourceContext } from "../context/SourceContext";
import { useState } from "react";
import Chat from '../components/Chat'; // Import the chatbot component

export default function Home() {
  const [source, setSource] = useState([]); // Source (pickup) state
  const [destination, setDestination] = useState([]); // Destination (dropoff) state

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <SearchSection /> {/* Renders the search section */}
            </div>
            <div className="col-span-2">
              <GoogleMapsSection /> {/* Renders the Google Maps section */}
            </div>
          </div>
        </LoadScript>
        <Chat /> {/* Add Chat component here */}
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
