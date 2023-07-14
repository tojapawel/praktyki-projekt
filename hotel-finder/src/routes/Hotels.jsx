import React, { useState, useEffect } from "react";
import HotelsList from "../components/Hotels/HotelsList/HotelsList";

import fetchAllHotels from "../functions/fetch/fetchAllHotels";
import fetchAllRooms from "../functions/fetch/fetchAllRooms";

import Footer from "../components/Footer/Footer";

import { useParams } from "react-router-dom";

const Hotels = () => {

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const { city } = useParams();
  const { guests } = useParams();

  useEffect(() => {
    const fetchAllHotelsFunc = async () => {
      const fetchedAllHotels = await fetchAllHotels();
      setHotels(fetchedAllHotels);
    };
    fetchAllHotelsFunc();
  }, []);
  
  useEffect(() => {
    const fetchAllRoomsFunc = async () => {
      const fetchedAllRooms = await fetchAllRooms();
      setRooms(fetchedAllRooms);
    };
    fetchAllRoomsFunc();
  }, []);
  
  return (
    <>
      {city === undefined ? (
        <HotelsList hotels={hotels} rooms={rooms} />
      ) : (
        <HotelsList hotels={hotels} rooms={rooms} city={city} guests={guests} />
      )}

      <Footer />
    </>
  );
};

export default Hotels;
