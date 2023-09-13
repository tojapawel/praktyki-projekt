import React, { useState, useEffect } from "react";

import fetchData from "../functions/fetchData";

import Footer from "../components/Footer/Footer";
import OneHotel from "../components/OneHotel/OneHotel";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";

const Hotel = () => {
  const [hotel, setHotel] = useState([]);
  const [rooms, setRooms] = useState([]);

  const { hotelId } = useParams();

  useEffect(() => {
    const fetchHotelFunc = async () => {
      const fetchedHotel = await fetchData("gethotel", hotelId);
      setHotel(fetchedHotel);
    };
    fetchHotelFunc();
  }, []);
  
  useEffect(() => {
    const fetchRoomsFunc = async () => {
      const fetchedRooms = await fetchData("getrooms", hotelId);
      setRooms(fetchedRooms);
    };
    fetchRoomsFunc();
  }, []);

  return (
    (hotel.length === 1 && rooms.length > 0) ? <><OneHotel hotel={hotel} rooms={rooms} hotelId={hotelId} /> <Footer /></>: E404()
  );
};

export default Hotel;
