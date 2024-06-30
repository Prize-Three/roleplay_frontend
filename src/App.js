import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Situation from './pages/Situation/Situation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/situation" element={<Situation />} />
      </Routes>
    </Router>
  );
}

export default App;

