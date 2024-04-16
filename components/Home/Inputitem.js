// Creating and styling the pickup and destination search bar on the left side of the screen, Uses React Google Places Autocomplete to autocomplete locations when users begin typing 

//Original File Paths
//@/context/DestinationContext
//@/context/SourceContext

"use client"
import { DestinationContex } from '/context/DestinationContext';
import { SourceContext } from '/context/SourceContext';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
//Function to get the longitude and lattitude of the pickup and dropoff locations

function Inputitem({type}) {
    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(null);
    const {source, setSource} = useContext(SourceContext);
    const {destination, setDestination} = useContext(DestinationContex);
    const getLatAndLng=(place, type)=>{
        const placeId=place.value.place_id;
        const service=new google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails({placeId}, (place,status)=>{
            if(status==='OK' && place.geometry && place.geometry.location){

                if(type=='source'){
                    setSource({
                        lat:place.geometry.location.lat(),
                        lng:place.geometry.location.lng(),
                        name:place.formatted_address,
                        label:place.name
                    })

                }else{
                    setDestination({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.formatted_address,
                        label: place.name
                    })


                }
            }

        })

    }
    //Function returns formatted pickup and dropoff that was entered by the user
  return (
      <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
        <Image src ={type=='source'?'/dot.png':'/square.png'} width={15} height = {15}/>
          {/*<input type='text' placeholder={type=='source'?'Pickup Location': 'Dropoff Location'} className='bg-transparent w-full outline-none'/>*/}
          <GooglePlacesAutocomplete 
              
              selectProps={{
                  value,
                  onChange: (place)=>{getLatAndLng(place,type); setValue(place)},
                  placeholder:'Pickup Location',
                  isClearable:true,
                  className:'w-full',
                  components:{
                    DropdownIndicator:false
                  },
                  styles:{
                      control: (provided) => ({
                          ...provided,
                          backgroundColor: '#00ffff00',
                          border:'none'
                      }),

                  }
              }}
          />


    </div>
  )
}

export default Inputitem