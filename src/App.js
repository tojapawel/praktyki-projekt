import { useState, useEffect } from 'react';

import './App.css';
import hotelsJSON from './json/hotels.json';
import Header from './components/Header/Header';
import HotelsList from './components/HotelsList/HotelsList';

function App() {
  const [filteredHotels, setFilteredHotels] = useState(hotelsJSON);

  const changeHotels = (fHotels) => {
    setFilteredHotels(fHotels);
  };

  return (
    <div>
      <Header hotels={hotelsJSON} fiHotels={changeHotels}></Header>
      
      <HotelsList hotels={filteredHotels} />
    </div>
  );
}

export default App;
