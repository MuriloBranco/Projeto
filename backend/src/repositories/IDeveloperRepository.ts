import { Developers } from '../models/developers';

interface IDeveloperDTO {
    id: number;
    nivel_id: string;
    nome: string;
    sexo: string;
    data_nascimento: Date;
    idade: number;
    hobby: string;
    }


interface IDeveloperRepository {
    create(developer: Omit<IDeveloperDTO, 'id'>): Promise<Developers>;
    findAll(): Promise<Developers[]>;
    findById(id: number): Promise<Developers | undefined>;
    update(id: number, developer: Partial<Developers>): Promise<Developers>;
    delete(id: number): Promise<void>;
};

export { IDeveloperRepository, IDeveloperDTO };