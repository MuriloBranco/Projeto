import React, { useEffect, useState } from 'react';
import { getLevels, deleteLevel } from '../services/api';
import LevelForm from './/LevelForm';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import swal from 'sweetalert';
import { Pagination } from '@mui/material';

type Level = {
  id: number;
  nivel: string;
};

const LevelList: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLevel(null);
  };

  useEffect(() => {
    loadLevels(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const loadLevels = async (page: number, query: string) => {
    try {
      const response = await getLevels(page, 10, query);
      setLevels(response.data.items);
      setTotalPages(response.data.totalPages);
      if (response.data.items.length === 0) {
        swal("Nenhum nível encontrado", {
          icon: "info",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar níveis', error);
    }
  };

  const handleSaveLevel = () => {
    loadLevels(currentPage, searchQuery);
  };

  const handleEditLevel = (level: Level) => {
    setSelectedLevel(level);
    handleOpenModal();
  };

  const handleDeleteLevel = async (id: number) => {
    const willDelete = await swal({
      title: "Tem certeza?",
      text: "Uma vez deletado, você não poderá recuperar este nível!",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteLevel(id);
        swal("Nível deletado com sucesso!", {
          icon: "success",
        });
        loadLevels(currentPage, searchQuery);
      } catch (error) {
        console.error('Erro ao deletar nível', error);
        swal("Erro", "Ocorreu um erro ao deletar o nível.", "error");
      }
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
};

  return (
    <div className="container mx-auto p-4">
      <Link to="/developers" className="text-blue-500">Voltar</Link>
      <h1 className="text-2xl font-bold mb-4">Lista de Níveis</h1>
      <div className="flex justify-between p-4">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
        onClick={handleOpenModal}
      >
        Adicionar Nível
      </button>
      <input
          className="rounded-2xl bg-gray-100 p-2"
          type="text"
          placeholder="Buscar níveis"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
      <LevelForm 
          level={selectedLevel}
          onClose={handleCloseModal}
          onSave={handleSaveLevel} 
        />
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
                  <tr>
                      <th className="py-2 px-4 text-left">Nome</th>
                      <th className="py-2 px-4 text-left">Quantidade vinculado</th>
                      <th className="py-2 px-4 text-left">Ações</th>
                    </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              <tr key={level.id} className="border-t">
                <td className="py-2 px-4">{level.nivel}</td>
                <td className="py-2 px-4">{level.nivel}</td>
                <td className="py-2 px-4 space-x-2">
                  <button 
                    className="bg-yellow-500 text-white px-2 py-1 rounded" 
                    onClick={() => handleEditLevel(level)}
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded" 
                    onClick={() => handleDeleteLevel(level.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>

                

          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default LevelList;