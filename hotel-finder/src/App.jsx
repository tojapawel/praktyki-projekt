import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";

import Index from './routes/Index';
import Hotels from './routes/Hotels';
import E404 from './routes/errors/E404';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hotels" element={<Hotels />} />

        <Route path="*" element={<E404 />} />
      </Routes>
    </Router>
  );
};

export default App;
