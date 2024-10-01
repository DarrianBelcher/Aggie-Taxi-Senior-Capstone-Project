//Creating the search section that allows users to input their pickup and drop off locaitons  
//@/context/SourceContext
//@/context/DestinationContext
"use client"; // Ensure this is marked as a client component

import React, { useContext, useEffect, useState } from 'react';
import Inputitem from './Inputitem';
import { SourceContext } from '/context/SourceContext';
import { DestinationContext } from '/context/DestinationContext'; // Fixed the typo here
import CarListOptions from './CarListOptions';

function SearchSection() {
    const { source, setSource } = useContext(SourceContext); // Access source context
    const { destination, setDestination } = useContext(DestinationContext); // Access destination context
    const [distance, setDistance] = useState(null);

    const calculateDistance = () => {
        if (!source || !destination) {
            console.log("Please select both source and destination.");
            return;
        }

        // Calculate the distance between the source and destination
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
            { lat: source.lat, lng: source.lng },
            { lat: destination.lat, lng: destination.lng }
        );
        
        const convertedDistance = dist * 0.000621374; // Convert meters to miles
        console.log("Calculated distance:", convertedDistance);
        setDistance(convertedDistance);
    };

    useEffect(() => {
        if (source) {
            console.log("Source location:", source);
        }
        if (destination) {
            console.log("Destination location:", destination);
        }
    }, [source, destination]);

    return (
        <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Get a Taxi</p>

            {/* Input for Pickup Location */}
            <Inputitem type='source' />

            {/* Input for Dropoff Location */}
            <Inputitem type='destination' />

            {/* Button to Calculate Distance */}
            <button
                className='p-3 bg-black w-full mt-5 text-white rounded-lg'
                onClick={calculateDistance}
            >
                Search
            </button>

            {/* Conditionally render CarListOptions when distance is calculated */}
            {distance && <CarListOptions distance={distance} />}
        </div>
    );
}

export default SearchSection;
