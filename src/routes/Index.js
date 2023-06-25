import { useState } from 'react';

import '../App.css';
import hotelsJSON from '../json/hotels.json';
import Header from '../components/Header/Header';
import HotelsList from '../components/HotelsList/HotelsList';

function Index() {
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const changeHotels = (fHotels) => {
    setFilteredHotels(fHotels);
  };

  return (
    <div className="main_container">
      <Header hotels={hotelsJSON} fiHotels={changeHotels}></Header>
      
      <HotelsList hotels={filteredHotels} />
    </div>
  );
}

export default Index;
