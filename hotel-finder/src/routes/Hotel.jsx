import React, { useState, useEffect } from "react";

import fetchData from "../functions/fetchData";

import Footer from "../components/Footer/Footer";
import OneHotel from "../components/OneHotel/OneHotel";

import E404 from "./errors/E404";

import { useParams } from "react-router-dom";

const Hotel = () => {
  const [data, setData] = useState([]);

  const [isError, setisError] = useState(false);
  const { hotelId } = useParams();

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);

  const errorHandler = (isError) => {
    setisError(isError);
  };

  if (isError) {
    return E404();
  } else {
    return (
      <>
        <OneHotel hotels={data} hotelId={hotelId} isError={errorHandler} />
        <Footer />
      </>
    );
  }
};

export default Hotel;
