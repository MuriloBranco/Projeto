import { Request, Response } from 'express';
import { CreateDeveloper } from '../services/developers/CreateDeveloper';
import { DevelopersRepository } from '../repositories/implementations/DeveloperRepository';
import { FindDeveloperById } from '../services/developers/FindDeveloperById';
import { UpdateDeveloper } from '../services/developers/UpdateDeveloper';
import { DeleteDeveloper } from '../services/developers/DeleteDeveloper';

class DeveloperController {
  async create(request: Request, response: Response) {
    const { nivel_id, nome, sexo, data_nascimento, hobby } = request.body;

    const developerRepository = new DevelopersRepository();
    const createDeveloper = new CreateDeveloper(developerRepository);

    try {
      const developer = await createDeveloper.execute({ nivel_id, nome, sexo, data_nascimento, hobby });
      return response.status(201).json(developer);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(request: Request, response: Response) {
    const developerRepository = new DevelopersRepository();

    try {
      const developers = await developerRepository.findAll();
      return response.json(developers);
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
      return response.json(developer);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nivel_id, nome, sexo, data_nascimento, hobby } = request.body;

    const developerRepository = new DevelopersRepository();
    const updateDeveloper = new UpdateDeveloper(developerRepository);

    try {
      const developer = await updateDeveloper.execute({ id: Number(id), nivel_id, nome, sexo, data_nascimento, hobby });
      if (!developer) {
        return response.status(404).json({ error: 'Developer not found' });
      }
      return response.json(developer);
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