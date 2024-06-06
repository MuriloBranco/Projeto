import { ILevelRepository } from "../../repositories/ILevelRepository";
import { Levels } from "../../models/levels";

interface IFindLevelByIdRequest  {
    id: number;
}



class FindLevelById {
  constructor(private levelRepository: ILevelRepository) {}

  async execute({id}: IFindLevelByIdRequest): Promise<Levels> {
    try {
      const level = await this.levelRepository.findById(id);

      if (!level) {
        throw new Error('Level not found');
      }

      return level;
    } catch (error) {
      console.error("Erro ao encontrar nível:", error);
      throw new Error("Não foi possível encontrar o nível. Por favor, tente novamente.");
    }
  }
}

export { FindLevelById };