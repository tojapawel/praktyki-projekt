import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './routes/Index';
import Hotel from './routes/Hotel';

import E404 from './routes/errors/E404';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Strona nie znaleziona</h2>
      {/* Treść strony błędu 404 */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hotel/:hotelId" element={<Hotel />} />

        <Route path="*" element={<E404 />} />
      </Routes>
    </Router>
  );
};

export default App;
