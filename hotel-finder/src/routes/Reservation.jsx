import React, { useState, useEffect } from "react";

// import fetchHotel from "../functions/fetch/fetchHotel";
// import fetchRoom from "../functions/fetch/fetchRoom";
// import fetchPromoCodes from "../functions/fetch/fetchPromoCodes";

import fetchData from "../functions/fetchData";

import Footer from "../components/Footer/Footer";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";
import ReservationForm from "../components/Reservation/ReservationForm";

const Reservation = () => {
  const [hotel, setHotel] = useState([]);
  const [room, setRoom] = useState([]);
  const [codes, setCodes] = useState([]);

  const { hotelId } = useParams();
  const { roomId } = useParams();

  useEffect(() => {
    const fetchHotelFunc = async () => {
      const fetchedHotel = await fetchData("gethotel", hotelId);
      setHotel(fetchedHotel);
    };
    fetchHotelFunc();
  }, []);
  
  useEffect(() => {
    const fetchRoomFunc = async () => {
      const fetchedRoom = await fetchData("getroom", roomId);
      setRoom(fetchedRoom);
    };
    fetchRoomFunc();
  }, []);

  useEffect(() => {
    const fetchPromoCodesFunc = async () => {
      const fetchedPromoCodes = await fetchData("getpromocodes");
      //FIXME: zmienić, żeby zamiast wyciągać wszystkie kody to, zeby sprawdzało czy dany podany kod jest w bazie
      setCodes(fetchedPromoCodes);
    };
    fetchPromoCodesFunc();
  }, []);

  return (
    (hotel.length === 1 && room.length === 1) ? <><ReservationForm hotel={hotel} room={room} codes={codes}/> <Footer /></>: E404()
  );
};

export default Reservation;
