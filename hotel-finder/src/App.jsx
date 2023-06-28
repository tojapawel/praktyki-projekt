import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './routes/Index';
import Hotel from './routes/Hotel';
import Tests from './routes/Tests';
import Hotels from './routes/Hotels';

import E404 from './routes/errors/E404';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/hotel/:hotelId" element={<Hotel />} />
        <Route path="/hotels/:city/:guests" element={<Hotels />} />
        <Route path="/hotels/" element={<Hotels />} />

        <Route path="*" element={<E404 />} />
      </Routes>
    </Router>
  );
};

export default App;
