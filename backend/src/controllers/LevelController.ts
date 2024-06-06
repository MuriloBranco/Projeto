import { Request, Response } from 'express';
import { CreateLevel } from '../services/levels/CreateLevel';
import { LevelsRepository } from '../repositories/implementations/LevelRepository';
import { FindLevelById } from '../services/levels/FindLevelsById';
import { UpdateLevel } from '../services/levels/UpdateLevel';
import { DeleteLevel } from '../services/levels/DeleteLevel';
import { FindAllLevels } from '../services/levels/FindAllLevels';





class LevelController {
   async index(request: Request, response: Response): Promise<Response> {
     const levelRepository = new LevelsRepository();
     const findAllLevels = new FindAllLevels(levelRepository);
     const { query, page = 1, pageSize = 10 } = request.query;

    try {
      const { levels, totalPages } = await findAllLevels.execute({ query: query as string, page: Number(page), pageSize: Number(pageSize) });
      if (levels.length === 0) {
        return response.status(404).json({ message: 'Nenhum nível encontrado' });
      }
      return response.json({ items: levels, totalPages });
    } catch (error) {
      console.error('Erro ao carregar níveis', error);
      return response.status(500).json({ message: 'Erro ao carregar níveis' });
    }
  }

  
  async create(request: Request, response: Response) {
    const { nivel } = request.body;

    const levelRepository = new LevelsRepository();
    const createLevel = new CreateLevel(levelRepository);

    try {
      const level = await createLevel.execute({ nivel });
      return response.status(201).json(level);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(request: Request, response: Response) {
    const levelRepository = new LevelsRepository();

    try {
      const level = await levelRepository.findAll();
      return response.json(level);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const levelRepository = new LevelsRepository();
    const findLevelById = new FindLevelById(levelRepository);

    try {
      const level = await findLevelById.execute({ id: Number(id) });
      if (!level) {
        return response.status(404).json({ error: 'Level not found' });
      }
      return response.json(level);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nivel } = request.body;

    const levelRepository = new LevelsRepository();
    const updateLevel = new UpdateLevel(levelRepository);

    try {
      const level = await updateLevel.execute({ id: Number(id), nivel });
      if (!level) {
        return response.status(404).json({ error: 'Level not found' });
      }
      return response.json(level);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const levelRepository = new LevelsRepository();
    const deleteLevel = new DeleteLevel(levelRepository);

    try {
      await deleteLevel.execute({ id: Number(id) });
      return response.status(204).send();
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export { LevelController };