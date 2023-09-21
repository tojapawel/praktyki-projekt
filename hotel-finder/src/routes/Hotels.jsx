import React, { useState, useEffect } from "react";
import HotelsList from "../components/Hotels/HotelsList/HotelsList";

import fetchData from "../functions/fetchData";

import Footer from "../components/Footer/Footer";

import { useParams } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const { city } = useParams();
  const { guests } = useParams();

  useEffect(() => {
    const fetchAllHotelsFunc = async () => {
      const fetchedAllHotels = await fetchData("gethotels");
      setHotels(fetchedAllHotels);
    };
    fetchAllHotelsFunc();
  }, []);

  useEffect(() => {
    const fetchAllRoomsFunc = async () => {
      const fetchedAllRooms = await fetchData("getrooms");
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
