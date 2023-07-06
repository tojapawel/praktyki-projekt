import React, { useState, useEffect } from "react";

import fetchData from "../functions/fetchData";
import fetchComments from "../functions/fetchComments";

import Footer from "../components/Footer/Footer";
import OneHotel from "../components/OneHotel/OneHotel";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";

const Hotel = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [hotel, setHotel] = useState([]);

  const [isError, setisError] = useState(false);
  const { hotelId } = useParams();

  
  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    fetchDataFunc();
  }, []);
  
  
  useEffect(() => {
    setHotel(data.filter((hotel) => hotel.id === hotelId));

    if(hotel[0] != undefined){
      const fetchCommentsFunc = async () => {
       const fetchedComments = await fetchComments(hotel[0].id);
        setComments(fetchedComments);
      };
      fetchCommentsFunc();
    }

  }, [data]);
  
  const errorHandler = (isError) => {
    setisError(isError);
  };


  if (isError) {
    return E404();
  } else {
    return (
      <>
        <OneHotel hotels={data} hotelId={hotelId} isError={errorHandler} comments={comments}/>
        <Footer />
      </>
    );
  }
};

export default Hotel;
