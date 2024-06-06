import { Request, Response } from 'express';
import { CreateDeveloper } from '../services/developers/CreateDeveloper';
import { DevelopersRepository } from '../repositories/implementations/DeveloperRepository';
import { LevelsRepository } from '../repositories/implementations/LevelRepository';
import { FindDeveloperById } from '../services/developers/FindDeveloperById';
import { UpdateDeveloper } from '../services/developers/UpdateDeveloper';
import { DeleteDeveloper } from '../services/developers/DeleteDeveloper';
import { FindAllDevelopers } from '../services/developers/FindAllDevelopers';



class DeveloperController {
  async index(request: Request, response: Response): Promise<Response> {
    const developersRepository = new DevelopersRepository();
    const findAllDevelopers = new FindAllDevelopers(developersRepository);
    const { query, page = 1, pageSize = 10 } = request.query;

    try {
      const { developers, total, perPage, currentPage, lastPage } = await findAllDevelopers.execute({ query: query as string, page: Number(page), pageSize: Number(pageSize) });
      if (developers.length === 0) {
        return response.status(404).json({ message: 'Nenhum desenvolvedor encontrado' });
      }
      return response.status(200).json({
        data: developers,
        meta: {
          total,
          per_page: perPage,
          current_page: currentPage,
          last_page: lastPage
        }
      });
    } catch (error) {
      console.error('Erro ao carregar desenvolvedor', error);
      return response.status(500).json({ message: 'Erro ao carregar desenvolvedor' });
    }
  }

  async create(request: Request, response: Response) {
    const { level, nome, sexo, data_nascimento, hobby } = request.body;

    const developerRepository = new DevelopersRepository();
    const createDeveloper = new CreateDeveloper(developerRepository);

    try {
      const developer = await createDeveloper.execute({ level, nome, sexo, data_nascimento, hobby });
      return response.status(201).json(developer);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const developerRepository = new DevelopersRepository();
    const findDeveloperById = new FindDeveloperById(developerRepository);

    try {
      const developer = await findDeveloperById.execute({ id: Number(id) });
      if (!developer) {
        return response.status(404).json({ error: 'Developer not found' });
      }
      return response.status(200).json(developer);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { level, nome, sexo, data_nascimento, hobby } = request.body;

    const developerRepository = new DevelopersRepository();
    const levelRepository = new LevelsRepository();
    const updateDeveloper = new UpdateDeveloper(developerRepository, levelRepository);

    try {
      const developer = await updateDeveloper.execute({ id: Number(id), level, nome, sexo, data_nascimento, hobby });
      if (!developer) {
        return response.status(404).json({ error: 'Developer not found' });
      }
      return response.status(200).json(developer);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const developerRepository = new DevelopersRepository();
    const deleteDeveloper = new DeleteDeveloper(developerRepository);

    try {
      await deleteDeveloper.execute({ id: Number(id) });
      return response.status(204).send();
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export { DeveloperController };