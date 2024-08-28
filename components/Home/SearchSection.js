//Creating the search section that allows users to input their pickup and drop off locaitons  
//@/context/SourceContext
//@/context/DestinationContext

"use client"
import React, { useContext, useEffect, useState } from 'react'
import Inputitem from './Inputitem'
import { SourceContext } from '/context/SourceContext';
import { DestinationContex } from '/context/DestinationContext';
import CarListOptions from './CarListOptions';





function SearchSection() {
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContex);
    const [distance, setDistance] = useState();
    const calculateDistance = () => {
        const dist = google.maps.geometry.spherical.computeDistanceBetween({ lat: source.lat, lng: source.lng }, { lat: destination.lat, lng: destination.lng }
        )
        
        const convertedDistance = dist * 0.000621374;
        console.log("Calculated distance:", convertedDistance);
        setDistance(convertedDistance);
        

    }


    useEffect(() => {
        if (source) {
            console.log(source)
        }
        if (destination) {
            console.log(destination)
        }

    }, [source, destination])


    return (
        <div>

            <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
                <p className='text-[20px] font-bold'>Get a Taxi</p>
                <Inputitem type='source' />
                <Inputitem type='destination' />
                <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'

                    onClick={() => calculateDistance()}
                >Search</button>
            </div>
            {distance ? <CarListOptions distance={distance} /> : null}
        </div>
    )
}

export default SearchSection