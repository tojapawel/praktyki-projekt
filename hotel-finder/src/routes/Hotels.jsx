import React, { useState, useEffect } from "react";
import HotelsList from "../components/Hotels/HotelsList/HotelsList";

import fetchData from "../functions/fetchData";
import Footer from "../components/Footer/Footer";

import { useParams } from "react-router-dom";

const Hotels = () => {
  const [data, setData] = useState([]);

  const { city } = useParams();
  const { guests } = useParams();

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);

  return (
    <>
      {city === undefined ? (
        <HotelsList hotels={data} />
      ) : (
        <HotelsList hotels={data} city={city} guests={guests} />
      )}

      <Footer />
    </>
  );
};

export default Hotels;
