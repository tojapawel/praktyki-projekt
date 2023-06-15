import './App.css';
import hotelsJSON from './json/hotels.json';
import HotelsList from './components/temp/HotelsList/HotelsList';


function App() {
  console.log(hotelsJSON);
  return (
    <div>
      <HotelsList items={hotelsJSON} />
    </div>
  );
}

export default App;
