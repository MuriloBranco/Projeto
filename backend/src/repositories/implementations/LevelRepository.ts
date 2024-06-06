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

// Conta quantos desenvolvedores estão associados ao nível especificado
    async hasAssociatedDevelopers(levelId: number): Promise<boolean> {
        const developersCount = await this.developerRepository.count({
          where: { nivel_id: levelId } 
        });
        return developersCount > 0;
    }

// Cria e salva um novo nível no banco de dados  
    async create(level: ILevelsDTO): Promise<Levels> {
        const newLevel = this.ormRepository.create(level);
        await this.ormRepository.save(newLevel);
        return newLevel;
    }

// Recupera todos os níveis do banco de dados
    async findAll(): Promise<Levels[]> {
        const levels = await this.ormRepository.find();
        return levels;
    }

// Busca um nível pelo ID especificado
    async findById(id: number): Promise<Levels | undefined> {
        const level = await this.ormRepository.findOneBy({id});
        return level;
    }

// Atualiza um nível e retorna a versão atualizada
    async update(id: number, level: Partial<ILevelsDTO>): Promise<Levels> {
        await this.ormRepository.update(id, level);
        const updateLevel = await this.ormRepository.findOneBy({id});
        return updateLevel;
    }

// Deleta um nível pelo ID especificado
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

    // async findLevelsWithDeveloperCount(page: number, limit: number, query: string) {
    //     const [levels, total] = await this.findAndCountLevels(query, page, limit);
    
    //     const levelsWithCount = await Promise.all(levels.map(async (level) => {
    //       const developerCount = await this.developerRepository.createQueryBuilder('developer')
    //         .where('developer.nivel_id = :levelId', { levelId: level.id })
    //         .getCount();
    //       return {
    //         ...level,
    //         developerCount
    //       };
    //     }));
    
    //     return {
    //       items: levelsWithCount,
    //       totalPages: Math.ceil(total / limit),
    //     };
    //   }
}

export { LevelsRepository };