import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [developers, setDevelopers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [recentDevelopers, setRecentDevelopers] = useState([]);

  useEffect(() => {
    fetchDevelopers();
    fetchLevels();
    fetchRecentDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get('/api/desenvolvedores');
      setDevelopers(response.data);
    } catch (error) {
      console.error('Erro ao buscar desenvolvedores', error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await axios.get('/api/niveis');
      setLevels(response.data);
    } catch (error) {
      console.error('Erro ao buscar níveis', error);
    }
  };

  const fetchRecentDevelopers = async () => {
    try {
      const response = await axios.get('/api/desenvolvedores/recentes');
      setRecentDevelopers(response.data);
    } catch (error) {
      console.error('Erro ao buscar desenvolvedores recentes', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Total de Desenvolvedores: {developers.length}</h2>
        <h2>Total de Níveis: {levels.length}</h2>
      </div>
      <div>
        <h3>Desenvolvedores Recentes</h3>

      </div>
    </div>
  );
};

export default HomePage;