import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import 'leaflet/dist/leaflet.css';

import "./App.css";

import Index from "./routes/Index";
import Hotels from "./routes/Hotels";
import Hotel from "./routes/Hotel";
import Reservation from "./routes/Reservation";
import ReservationFinal from "./components/Reservation/ReservationFinal";

import E404 from "./routes/errors/E404";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:city/:guests" element={<Hotels />} />
        <Route path="/hotel/:hotelId" element={<Hotel />} />
        <Route path="/reservation/:hotelId/:roomId" element={<Reservation />} />
        <Route path="/reservation/final" element={<ReservationFinal />} />

        <Route path="*" element={<E404 />} />
      </Routes>
    </Router>
  );
};

export default App;
