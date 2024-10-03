"use client";

import React, { useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext'; // Corrected typo

function GoogleMapsSection() {
    const containerStyle = {
        width: '100%',
        height: window.innerWidth * 0.45
    };

    const { source, setSource } = useContext(SourceContext); // Correct context usage
    const { destination, setDestination } = useContext(DestinationContext); // Correct context usage

    const [center, setCenter] = useState({
        lat: -3.745, // Default latitude
        lng: -38.523 // Default longitude
    });

    const [map, setMap] = useState(null);
    const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [center]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    useEffect(() => {
        if (source && source.lat && map) {
            map.panTo({ lat: source.lat, lng: source.lng });
            setCenter({ lat: source.lat, lng: source.lng });
        }

        if (source && destination) {
            directionRoute();
        }
    }, [source, map]);

    useEffect(() => {
        if (destination && destination.lat && map) {
            setCenter({ lat: destination.lat, lng: destination.lng });
        }

        if (source && destination) {
            directionRoute();
        }
    }, [destination, map]);

    // Function to draw a route between the pickup and dropoff locations
    const directionRoute = () => {
        const DirectionService = new google.maps.DirectionsService();

        DirectionService.route({
            origin: { lat: source.lat, lng: source.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirectionRoutePoints(result);
            } else {
                console.error('Error in drawing route');
            }
        });
    };

    return (
        // Google Map and markers for pickup and dropoff locations
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ mapId: 'b896538671b73457' }}
        >
            {source && source.lat && (
                <MarkerF
                    position={{ lat: source.lat, lng: source.lng }}
                    icon={{
                        url: "/sourceMarker.png",
                        scaledSize: { width: 20, height: 20 }
                    }}
                >
                    <OverlayViewF
                        position={{ lat: source.lat, lng: source.lng }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className='p-2 bg-white font-bold inline-block'>
                            <p className='text-black text-[18px]'>{source.label}</p>
                        </div>
                    </OverlayViewF>
                </MarkerF>
            )}

            {destination && destination.lat && (
                <MarkerF
                    position={{ lat: destination.lat, lng: destination.lng }}
                    icon={{
                        url: "/destinationMarker.png",
                        scaledSize: { width: 20, height: 20 }
                    }}
                >
                    <OverlayViewF
                        position={{ lat: destination.lat, lng: destination.lng }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className='p-2 bg-white font-bold inline-block'>
                            <p className='text-black text-[18px]'>{destination.label}</p>
                        </div>
                    </OverlayViewF>
                </MarkerF>
            )}

            {directionRoutePoints && (
                <DirectionsRenderer
                    directions={directionRoutePoints}
                    options={{
                        polylineOptions: {
                            strokeColor: '#000',
                            strokeWeight: 5
                        },
                        suppressMarkers: true
                    }}
                />
            )}
        </GoogleMap>
    );
}

export default GoogleMapsSection;
