import './App.css';
import hotelsJSON from './json/hotels.json';
import Header from './components/Header/Header';
import HotelsList from './components/temp/HotelsList/HotelsList';

function App() {
  return (
    <div>
      <Header items={hotelsJSON}></Header>
      {/* <HotelsList items={hotelsJSON} /> */}
    </div>
  );
}

export default App;
