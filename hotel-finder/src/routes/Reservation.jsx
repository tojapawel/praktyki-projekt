import React, { useState, useEffect } from "react";

import fetchHotel from "../functions/fetch/fetchHotel";
import fetchRoom from "../functions/fetch/fetchRoom";

import Footer from "../components/Footer/Footer";
import OneHotel from "../components/OneHotel/OneHotel";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";
import ReservationForm from "../components/Reservation/ReservationForm";

const Reservation = () => {
  const [hotel, setHotel] = useState([]);
  const [room, setRoom] = useState([]);

  const { hotelId } = useParams();
  const { roomId } = useParams();

  useEffect(() => {
    const fetchHotelFunc = async () => {
      const fetchedHotel = await fetchHotel(hotelId);
      setHotel(fetchedHotel);
    };
    fetchHotelFunc();
  }, []);
  
  useEffect(() => {
    const fetchRoomFunc = async () => {
      const fetchedRoom = await fetchRoom(roomId);
      setRoom(fetchedRoom);
    };
    fetchRoomFunc();
  }, []);

  return (
    (hotel.length === 1 && room.length === 1) ? <><ReservationForm hotel={hotel} room={room}/> <Footer /></>: E404()
  );
};

export default Reservation;
