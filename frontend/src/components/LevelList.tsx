import React, { useEffect, useState, useCallback } from 'react';
import { getLevels, deleteLevel } from '../services/api';
import LevelForm from './LevelForm';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import swal from 'sweetalert';
import { Pagination } from '@mui/material';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLevel(null);
  };

  const loadLevels = useCallback(async (page: number, query: string) => {
    try {
      const response = await getLevels(page, 10, query);
      let sortedLevels = response.data.data.sort((a: Level, b: Level) => {
        if (a.nivel < b.nivel) return sortOrder === 'asc' ? -1 : 1;
        if (a.nivel > b.nivel) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setLevels(sortedLevels);
      setTotalPages(response.data.meta.last_page);
      if (response.data.data.length === 0) {
        swal("Nenhum nível encontrado", {
          icon: "info",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar níveis', error);
    }
  }, [sortOrder]);

  useEffect(() => {
    loadLevels(currentPage, searchQuery);
  }, [currentPage, searchQuery, sortOrder, loadLevels]);

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
        setLevels(currentLevels => currentLevels.filter(level => level.id !== id));
        swal("Nível deletado com sucesso!", {
          icon: "success",
        });
        loadLevels(currentPage, searchQuery);
      } catch (error) {
        console.error('Erro ao deletar nível', error);
        swal("Erro", "Há desenvolvedores associados a este nível, não é possível deletá-lo.", "error");
      }
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSortByName = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container min-h-screen min-w-full p-12 bg-slate-200">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4 p-1">Lista de Níveis</h1>
        <Link to="/developers">
          <Button color='danger'>
            Gerenciar Desenvolvedores
          </Button>
        </Link>
      </div>
      <div className="flex justify-between p-4">
        <Button onClick={handleOpenModal} className="bg-green-500">
          Adicionar Nível
        </Button>
        <input
          className="rounded-2xl bg-white p-2 "
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
        <table className="min-w-full bg-white border table-fixed">
          <thead>
            <tr className="bg-amber-400">
              <th className="py-2 px-4 text-left cursor-pointer w-2/5" onClick={handleSortByName}>
                Nome
                &nbsp;
                <FontAwesomeIcon icon={faSort} />
              </th>
              <th className="py-2 px-4 text-left w-2/5">Quantidade vinculado</th>
              <th className="py-2 px-4 text-left w-1/3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              <tr key={level.id} className="border-t flex flex-wrap md:table-row">
                <td className="py-2 px-4 w-full md:w-auto">{level.nivel}</td>
                <td className="py-2 px-4 w-full md:w-auto">{level.nivel}</td>
                <td className="py-2 px-4 w-full md:w-auto flex space-x-2 justify-center md:justify-start">
                  <Button 
                    color="secondary" 
                    onClick={() => handleEditLevel(level)}
                  >
                    Editar
                  </Button>
                  <Button 
                    color="danger" 
                    onClick={() => handleDeleteLevel(level.id)}
                  >
                    Deletar
                  </Button>
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