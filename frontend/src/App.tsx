import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Developers from './pages/developers';
import Levels from './pages/levels';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/developers" element={<Developers />} />
        <Route path="/levels" element={<Levels />} />
      </Routes>
    </Router>
  );
}

export default App;