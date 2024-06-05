import { Repository } from "typeorm";
import { IDeveloperRepository, IDeveloperDTO } from "../IDeveloperRepository";
import { Developers } from "../../models/developers";
import { AppDataSource } from "../../data-source";



class DevelopersRepository implements IDeveloperRepository {
  private ormRepository: Repository<Developers>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Developers);
  }

    async create(developer: IDeveloperDTO): Promise<Developers> {
        const newDeveloper = this.ormRepository.create(developer);
        await this.ormRepository.save(newDeveloper);
        return newDeveloper;
    }

    async findAll(): Promise<Developers[]> {
        const developers = await this.ormRepository.find();
        return developers;
    }

    async findById(id: number): Promise<Developers | undefined> {
        const developer = await this.ormRepository.findOneBy({id});
        return developer;
    }

    async update(id: number, developer: Partial<IDeveloperDTO>): Promise<Developers> {
        await this.ormRepository.update(id, developer);
        const updatedDeveloper = await this.ormRepository.findOneBy({id});
        return updatedDeveloper;
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async findAndCountDevelopers(query: string, page: number, pageSize: number): Promise<[Developers[], number]> {
        return this.ormRepository.createQueryBuilder("developer")
        .where("LOWER(developer.nome) LIKE :query", { query: `%${query.toLowerCase()}%` })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
    }
}

export { DevelopersRepository };