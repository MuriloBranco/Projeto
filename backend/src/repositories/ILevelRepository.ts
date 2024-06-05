import { Levels } from '../models/levels';


interface ILevelsDTO {
    id: number;
    nivel: string;
    }


interface ILevelRepository {
    create(developer: Omit<ILevelsDTO, 'id'>): Promise<Levels>;
    findAll(): Promise<Levels[]>;
    findById(id: number): Promise<Levels | undefined>;
    update(id: number, developer: Partial<Levels>): Promise<Levels>;
    delete(id: number): Promise<void>;
    findAndCountLevels(query: string, page: number, pageSize: number): Promise<[Levels[], number]>;
}

export { ILevelRepository, ILevelsDTO };
