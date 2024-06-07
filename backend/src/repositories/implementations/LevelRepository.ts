import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ILevelRepository, ILevelsDTO } from "../ILevelRepository";
import { Levels } from "../../models/levels";
import { Developers } from "../../models/developers";



class LevelsRepository implements ILevelRepository {
  private ormRepository: Repository<Levels>;
  private developerRepository: Repository<Developers>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Levels);
    this.developerRepository = AppDataSource.getRepository(Developers);
  }


    async hasAssociatedDevelopers(levelId: number): Promise<boolean> {
        const developersCount = await this.developerRepository.count({
          where: { level: {id: levelId} } 
        });
        return developersCount > 0;
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

    async findAndCountLevels(query: string, page: number, pageSize: number): Promise<{ levels: Levels[], total: number, currentPage: number, lastPage: number }> {
        const [levels, total] = await this.ormRepository.createQueryBuilder("level")
        .where("LOWER(level.nivel) LIKE :query", { query: `%${query.toLowerCase()}%` })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

        const lastPage = Math.ceil(total / pageSize);

        return {
            levels,
            total,
            currentPage: page,
            lastPage
        }
    }

}

export { LevelsRepository };