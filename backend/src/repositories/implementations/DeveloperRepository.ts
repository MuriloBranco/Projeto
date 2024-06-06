import { Repository } from "typeorm";
import { IDeveloperRepository, IDeveloperDTO } from "../IDeveloperRepository";
import { Developers } from "../../models/developers";
import { AppDataSource } from "../../data-source";
import { Levels } from "../../models/levels";



class DevelopersRepository implements IDeveloperRepository {
  private ormRepository: Repository<Developers>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Developers);
  }

  async create(developer: Omit<IDeveloperDTO, 'id'>): Promise<Developers> {
    const newDeveloper = this.ormRepository.create({
      ...developer,
      level: { id: developer.level } as Levels // Transformar level em referência à entidade Levels
    });
    await this.ormRepository.save(newDeveloper);
    return newDeveloper;
  }

    async findAll(): Promise<any> {
        const developers = await this.ormRepository.find({
            relations: ["level"]
        });
        return developers;
    }

    async findById(id: number): Promise<Developers | undefined> {
        const developer = await this.ormRepository.findOne({
            where: { id },
            relations: ["level"]
        });
        return developer;
    }

    async update(id: number, developer: Partial<IDeveloperDTO>): Promise<Developers> {
        if (developer.level !== undefined) {
          const levelRepository = AppDataSource.getRepository(Levels);
          const levelEntity = await levelRepository.findOne({ where: { id: developer.level } });
          if (levelEntity) {
            (developer as any).level = levelEntity;
          } else {
            throw new Error('Level not found');
          }
        }
    
        await this.ormRepository.update(id, developer as any);
        const updatedDeveloper = await this.ormRepository.findOne({
          where: { id },
          relations: ["level"]
        });
    
        if (!updatedDeveloper) {
          throw new Error('Developer not found');
        }
    
        return updatedDeveloper;
      }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async findAndCountDevelopers(query: string, page: number, pageSize: number): Promise<any> {
        const response = await this.ormRepository.createQueryBuilder("developer")
            .leftJoinAndSelect("developer.level", "nivel")
            .where("LOWER(developer.nome) LIKE :query", { query: `%${query.toLowerCase()}%` })
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
            
        console.log(response);
        return response;
     }
}

export { DevelopersRepository };