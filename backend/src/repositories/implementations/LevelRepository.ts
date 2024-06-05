import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ILevelRepository, ILevelsDTO } from "../ILevelRepository";
import { Levels } from "../../models/levels";



class LevelsRepository implements ILevelRepository {
  private ormRepository: Repository<Levels>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Levels);
  }

    async create(level: ILevelsDTO): Promise<Levels> {
        const newLevel = this.ormRepository.create(level);
        await this.ormRepository.save(newLevel);
        return newLevel;
    }

    async findAll(): Promise<Levels[]> {
        const levels = await this.ormRepository.find();
        return levels;
    }

    async findById(id: number): Promise<Levels | undefined> {
        const level = await this.ormRepository.findOneBy({id});
        return level;
    }

    async update(id: number, level: Partial<ILevelsDTO>): Promise<Levels> {
        await this.ormRepository.update(id, level);
        const updateLevel = await this.ormRepository.findOneBy({id});
        return updateLevel;
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async findAndCountLevels(query: string, page: number, pageSize: number): Promise<[Levels[], number]> {
        return this.ormRepository.createQueryBuilder("level")
        .where("LOWER(level.nivel) LIKE :query", { query: `%${query.toLowerCase()}%` })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
    }
}

export { LevelsRepository };