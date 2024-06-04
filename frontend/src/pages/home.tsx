import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo à Aplicação</h1>
      <nav className="mb-4">
        <ul className="space-y-2">
          <li>
            <Link to="/developers" className="text-blue-500 hover:underline">
              Desenvolvedores
            </Link>
          </li>
          <li>
            <Link to="/levels" className="text-blue-500 hover:underline">
              Níveis
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;