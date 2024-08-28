//Updating the app layout to ensure that the search and google maps function works on desktop and mobile. The layout ensures that the screen is properly divided. 


//Original FIle Destinations from Video
//@/components/Home/GoogleMapsSection
//@/components/Home/SearchSection
//@/context/DestinationContext
//@/context/SourceContext
"use client"


import { LoadScript } from "@react-google-maps/api";
import GoogleMapsSection from "../components/Home/GoogleMapsSection";
import SearchSection from "../components/Home/SearchSection";
import { DestinationContex } from "../context/DestinationContext";
import { SourceContext } from "../context/SourceContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [source, setSource] = useState([])
  const [destination, setDestination] = useState([])
  return (

    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContex.Provider value={{ destination, setDestination }}>
        <LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <SearchSection />
            </div>


            <div className='col-span-2'>
              <GoogleMapsSection />
            </div>
          </div>
        </LoadScript>
      </DestinationContex.Provider>
    </SourceContext.Provider>

  );
}
