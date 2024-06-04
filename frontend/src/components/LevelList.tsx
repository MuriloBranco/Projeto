import React, { useEffect, useState } from 'react';
import { getLevels, updateLevel, deleteLevel } from '../services/api';
import LevelForm from './/LevelForm';
import Modal from './Modal';

type Level = {
  id: number;
  nivel: string;
};

const LevelList: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      const response = await getLevels();
      setLevels(response.data);
    } catch (error) {
      console.error('Erro ao carregar níveis', error);
    }
  };

  const handleUpdateLevel = async (id: number) => {
    const updatedLevel: Partial<Omit<Level, 'id'>> = {
      nivel: 'Nível Atualizado'
    };
    try {
      await updateLevel(id, updatedLevel);
      loadLevels();
    } catch (error) {
      console.error('Erro ao atualizar nível', error);
    }
  };

  const handleDeleteLevel = async (id: number) => {
    try {
      await deleteLevel(id);
      loadLevels();
    } catch (error) {
      console.error('Erro ao deletar nível', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Níveis</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
        onClick={handleOpenModal}
      >
        Adicionar Nível
      </button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <LevelForm onClose={handleCloseModal} />
      </Modal>
      <ul className="space-y-2">
        {levels.map((level) => (
          <li 
            key={level.id} 
            className="flex justify-between items-center p-4 border border-gray-200 rounded"
          >
            <span>{level.nivel}</span>
            <div className="space-x-2">
              <button 
                className="bg-yellow-500 text-white px-2 py-1 rounded" 
                onClick={() => handleUpdateLevel(level.id)}
              >
                Editar
              </button>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded" 
                onClick={() => handleDeleteLevel(level.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelList;