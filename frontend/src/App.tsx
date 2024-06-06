import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Developers from './pages/developers';
import Levels from './pages/levels';
import Home from './pages/home';

const NotFound = () => (
  <div>
    <h1>404 - Página Não Encontrada</h1>
    <a href="/">Voltar para a Página Inicial</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;