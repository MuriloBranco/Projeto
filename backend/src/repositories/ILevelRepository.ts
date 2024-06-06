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
    hasAssociatedDevelopers(levelId: number): Promise<boolean>;
    findAndCountLevels(query: string, page: number, pageSize: number): Promise<{ levels: Levels[], total: number, currentPage: number, lastPage: number }>;
    // findLevelsWithDeveloperCount(page: number, limit: number, query: string): Promise<{ items: Levels[], totalPages: number }>;
}

export { ILevelRepository, ILevelsDTO };
