import { useState, useEffect } from "react";

import "../App.css";
import Header from "../components/Header/Header";
import HotelsList from "../components/HotelsList/HotelsList";

import fetchData from "../functions/fetchData";

function Index() {
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);

  const changeHotels = (fHotels) => {
    setFilteredHotels(fHotels);
  };

  return (
    <div className="main_container">
      <Header hotels={data} fiHotels={changeHotels}></Header>

      <HotelsList hotels={filteredHotels} />
    </div>
  );
}

export default Index;
