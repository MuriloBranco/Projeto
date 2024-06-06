import React from 'react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo à Aplicação</h1>
            <p className="text-gray-500 mb-5">
              Explore a aplicação e gerencie desenvolvedores e níveis de maneira eficiente.
            </p>
            <nav className="space-y-4">
              <Link to="/developers" className="block text-blue-500 hover:underline">
                Gerenciar Desenvolvedores
              </Link>
              <Link to="/levels" className="block text-blue-500 hover:underline">
                Gerenciar Níveis
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;