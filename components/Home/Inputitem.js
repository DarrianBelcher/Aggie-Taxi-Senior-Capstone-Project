"use client";
import { DestinationContext } from '/context/DestinationContext';
import { SourceContext } from '/context/SourceContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function Inputitem({ type }) {
  const [value, setValue] = useState(null);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        const locationData = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        };

        if (type === 'source') {
          setSource(locationData);
          localStorage.setItem('origin', JSON.stringify(locationData)); // Save origin to localStorage
        } else {
          setDestination(locationData);
          localStorage.setItem('destination', JSON.stringify(locationData)); // Save destination to localStorage
        }
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === 'source' ? '/dot.png' : '/square.png'}
        width={15}
        height={15}
        alt="Location"
      />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: type === 'source' ? 'Pickup Location' : 'Dropoff Location',
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00ffff00',
              border: 'none',
            }),
          },
        }}
      />
    </div>
  );
}

export default Inputitem;
