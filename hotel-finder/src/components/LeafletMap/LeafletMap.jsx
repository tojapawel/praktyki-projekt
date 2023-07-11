import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = (props) => {
  const [position, setPosition] = useState([0, 0]);

  //TODO: zrobić, zeby podczas dodawania hoteli do bazy danych dodawawało do niej też koordynaty danego miasta
  const handleSearch = async () => {
    try {
      const apiUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(props.city)}`;

      axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setPosition([response.data[0].lat, response.data[0].lon]);
        } else {
          console.error('No coordinates found for the city');
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
      });
    } catch (error) {
      console.error('Błąd:', error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      {position[0] !== 0 && position[1] !== 0 ? (
        <MapContainer center={position} zoom={13} className='rounded' style={{ height: '200px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{props.city}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Ładowanie mapy...</p>
      )}
    </>
  );
};

export default LeafletMap;
