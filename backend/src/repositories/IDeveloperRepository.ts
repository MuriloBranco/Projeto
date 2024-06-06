import { Developers } from '../models/developers';

interface IDeveloperDTO {
    id: number;
    level: number;
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
    update(id: number, data: Partial<IDeveloperDTO>): Promise<Developers>;
    delete(id: number): Promise<void>;
    findAndCountDevelopers(query: string, page: number, pageSize: number): Promise<[Developers[], number]>;
  };

export { IDeveloperRepository, IDeveloperDTO };