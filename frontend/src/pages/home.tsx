import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <div className="bg-slate-200 min-h-screen min-w-full mx-auto p-8">
      <div className="max-w-md mx-auto bg-orange-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo à Aplicação de Gerenciamento de Desenvolvedores</h1>
              <p className='text-gray-900 mb-5"'>
                Utilize os botões abaixo para começar a gerenciar os desenvolvedores e níveis.
              </p>
            <nav className="flex gap-4 mt-12">
              <Link to="/developers">
                <Button color='secondary' className='text-gray-700'>
                  Gerenciar Desenvolvedores
                </Button>           
              </Link>
              <Link to="/levels">
                <Button color='secondary' className='text-gray-700'>
                  Gerenciar Níveis
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;