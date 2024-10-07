// Creating and styling the pickup and destination search bar on the left side of the screen, Uses React Google Places Autocomplete to autocomplete locations when users begin typing
"use client"
import { DestinationContext } from '/context/DestinationContext';  // Corrected spelling
import { SourceContext } from '/context/SourceContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Chatbot from 'react-chatbot-kit';

import 'react-chatbot-kit/build/main.css';
import botConfig from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const MyComponent = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      <button
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1001,
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isChatbotVisible ? 'Hide Chatbot' : 'Show Chatbot'}
      </button>

      {isChatbotVisible && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          left: '20px',
          zIndex: 1000,
          width: '300px',
          height: '500px',
          maxWidth: '90vw',
          maxHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff'
        }}>
          <Chatbot
            config={botConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

function Inputitem({ type }) {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);  // Corrected spelling

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        if (type === 'source') {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image src={type === 'source' ? '/dot.png' : '/square.png'} width={15} height={15} />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => { getLatAndLng(place, type); setValue(place); },
          placeholder: 'Pickup Location',
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
      <MyComponent />
    </div>
  );
}

export default Inputitem;