import { Levels } from '../models/levels';


interface ILevelRepository {

    findAll(): Promise<[Levels]>;

}

export { ILevelRepository };