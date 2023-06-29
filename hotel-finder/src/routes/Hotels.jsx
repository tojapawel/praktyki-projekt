import React, { useState, useEffect } from "react";
import HotelsList from "../components/Hotels/HotelsList/HotelsList";

import fetchData from "../functions/fetchData"
import Footer from "../components/Footer/Footer";

const Hotels = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);
  
  return (
    <>
      <HotelsList hotels={data} />
      <Footer />
    </>
  );
}

export default Hotels;
