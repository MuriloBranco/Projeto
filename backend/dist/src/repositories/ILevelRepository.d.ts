import { Levels } from '../entity/levels';
interface ILevelRepository {
    save(item: any): Promise<Levels>;
    findById(id: string): Promise<Levels | undefined>;
}
export { ILevelRepository };
