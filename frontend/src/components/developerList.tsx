import React, { useEffect, useState } from "react";
import { getDevelopers, deleteDeveloper } from "../services/api";
import { Developer } from "../types/types";
import { Pagination } from '@mui/material';
import Modal from "./Modal";
import DeveloperForm from "./DeveloperForm";
import swal from 'sweetalert';

const DeveloperList: React.FC = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDeveloper(null);
    };

    useEffect(() => {
        loadDevelopers(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const loadDevelopers = async (page: number, query: string) => {
        try {
            const response = await getDevelopers(page, 10 , query);
            setDevelopers(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao carregar desenvolvedores", error);
        }
    };

    const handleSaveDeveloper = () => {
        loadDevelopers(currentPage, searchQuery);
    };

    const handleEditDeveloper = (developer: Developer) => {
        setSelectedDeveloper(developer);
        handleOpenModal();
    };

    const handleDeleteDeveloper = async (id: number) => {
        const willDelete = await swal({
            title: "Tem certeza?",
            text: "Uma vez deletado, você não poderá recuperar este desenvolvedor!",
            icon: "warning",
            buttons: ["Cancelar", "Deletar"],
            dangerMode: true,
        });

        if (willDelete) {
            try {
                await deleteDeveloper(id);
                swal("Desenvolvedor deletado com sucesso!", {
                    icon: "success",
                });
                loadDevelopers(currentPage, searchQuery);
            } catch (error) {
                console.error("Erro ao deletar desenvolvedor", error);
                swal("Erro", "Ocorreu um erro ao deletar o desenvolvedor.", "error");
            }
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Desenvolvedores</h1>
            <div className="flex justify-between p-4">
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
                onClick={handleOpenModal}
            >
                Adicionar Desenvolvedor
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
                <DeveloperForm 
                    developer={selectedDeveloper}
                    onClose={handleCloseModal}
                    onSave={handleSaveDeveloper} 
                />
            </Modal>
            <ul className="space-y-2">
                {developers.map((developer) => (
                    <li 
                        key={developer.id} 
                        className="flex justify-between items-center p-4 border border-gray-200 rounded"
                    >
                        <span>{developer.nome}</span>
                        <div className="space-x-2">
                            <button 
                                className="bg-yellow-500 text-white px-2 py-1 rounded" 
                                onClick={() => handleEditDeveloper(developer)}
                            >
                                Editar
                            </button>
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded" 
                                onClick={() => handleDeleteDeveloper(developer.id)}
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
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

export default DeveloperList;