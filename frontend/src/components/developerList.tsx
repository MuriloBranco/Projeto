import React, { useCallback, useEffect, useState } from "react";
import { getDevelopers, deleteDeveloper } from "../services/api";
import { Link } from 'react-router-dom';
import { Developer } from "../types/types";
import { Pagination } from '@mui/material';
import Modal from "./Modal";
import DeveloperForm from "./DeveloperForm";
import swal from 'sweetalert';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from 'date-fns';
import Button from './Button';

const DeveloperList: React.FC = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDeveloper(null);
    };


    const loadDevelopers = useCallback(async (page: number, query: string) => {
        try {
            const response = await getDevelopers(page, 10 , query);
            let sortedDevelopers = response.data.data.sort((a: Developer, b: Developer) => {
                if (a.nome < b.nome) return sortOrder === 'asc' ? -1 : 1;
                if (a.nome > b.nome) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
            setDevelopers(sortedDevelopers);
            setTotalPages(response.data.meta.last_page);
        } catch (error) {
            console.error("Erro ao carregar desenvolvedores", error);
        }
    }, [sortOrder]);

    useEffect(() => {
        loadDevelopers(currentPage, searchQuery);
    }, [currentPage, searchQuery, sortOrder, loadDevelopers]);



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
                // console.error("Erro ao deletar desenvolvedor", error);
                swal("Erro", "Ocorreu um erro ao deletar o desenvolvedor.", "error");
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
        <div className="container max-w-full p-12">

            <div className="flex justify-between">
                <h1 className="text-4xl font-bold mb-4 p1">Lista de Desenvolvedores</h1>
                <Link to="/levels">
                    <Button color='danger'>
                        Gerenciar Níveis
                    </Button>
                </Link>
                </div>
            <div className="flex justify-between p-4">
                <Button onClick={handleOpenModal} color="primary">
                    Adicionar Desenvolvedor
                </Button>
                
                <input
                    className="rounded-2xl bg-gray-100 p-2"
                    type="text"
                    placeholder="Buscar desenvolvedor"
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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border table-fixed">
                    <thead>
                        <tr className="bg-slate-300">
                            <th className="py-2 px-4 text-left cursor-pointer w-1/6" onClick={handleSortByName}
                            >Nome
                            &nbsp;
                            <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th className="py-2 px-4 text-left w-1/6">Nível</th>
                            <th className="py-2 px-4 text-left w-1/6">Idade</th>
                            <th className="py-2 px-4 text-left w-1/6">Sexo</th>
                            <th className="py-2 px-4 text-left w-1/6">Hobby</th>
                            <th className="py-2 px-4 text-left w-1/6">Aniversário</th>
                            <th className="py-2 px-4 text-left w-1/6">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developers.map((developer) => (
                            <tr key={developer.id} className="border-t flex flex-wrap md:table-row">
                                <td className="py-2 px-4 w-full md:w-auto">{developer.nome}</td>
                                <td className="py-2 px-4 w-full md:w-auto">{developer.level.nivel}</td>
                                <td className="py-2 px-4 w-full md:w-auto">{developer.idade}</td>
                                <td className="py-2 px-4 w-full md:w-auto">{developer.sexo}</td>
                                <td className="py-2 px-4 w-full md:w-auto">{developer.hobby}</td>
                                <td className="py-2 px-4 w-full md:w-auto">{format(new Date(developer.data_nascimento), 'dd/MM/yyyy')}</td>
                                <td className="py-2 px-4 w-full md:w-auto flex space-x-2 justify-center md:justify-start">
                                    <Button 
                                        color="secondary" 
                                        onClick={() => handleEditDeveloper(developer)}
                                    >
                                        Editar
                                    </Button>
                                    <Button 
                                        color="danger" 
                                        onClick={() => handleDeleteDeveloper(developer.id)}
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

export default DeveloperList;