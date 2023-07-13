import React, { useState, useEffect } from "react";

import fetchHotel from "../functions/fetch/fetchHotel";
import fetchRooms from "../functions/fetch/fetchRooms";
import fetchComments from "../functions/fetchComments";

import Footer from "../components/Footer/Footer";
import OneHotel from "../components/OneHotel/OneHotel";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";

const Hotel = () => {
  const [comments, setComments] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [isError, setisError] = useState(false);
  const { hotelId } = useParams();

  useEffect(() => {
    const fetchHotelFunc = async () => {
      const fetchedHotel = await fetchHotel(hotelId);
      setHotel(fetchedHotel);
    };
    fetchHotelFunc();
  }, []);
  
  useEffect(() => {
    const fetchRoomsFunc = async () => {
      const fetchedRooms = await fetchRooms(hotelId);
      setRooms(fetchedRooms);
    };
    fetchRoomsFunc();
  }, []);
  
  useEffect(() => {
    if(hotel.length === 1){
      const fetchCommentsFunc = async () => {
       const fetchedComments = await fetchComments(hotelId);
        setComments(fetchedComments);
      };
      fetchCommentsFunc();
    }

  }, [hotel]);
  
  const errorHandler = (isError) => {
    setisError(isError);
  };

  if (isError) {
    return E404();
  } else {
    return (
        (hotel.length === 1 && rooms.length > 0) ? <><OneHotel hotel={hotel} rooms={rooms} hotelId={hotelId} isError={errorHandler} comments={comments}/> <Footer /></>: E404()
    );
  }
};

export default Hotel;
