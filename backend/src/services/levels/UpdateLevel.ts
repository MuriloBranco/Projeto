import { ILevelRepository } from "../../repositories/ILevelRepository";
import { Levels } from "../../models/levels";

interface IUpdateLevelRequest  {
    id: number;
    nivel: string;

}

class UpdateLevel {
  constructor(private levelRepository: ILevelRepository) {}

  async execute({ id, nivel }: IUpdateLevelRequest ): Promise<Levels> {
    try {
      const level = await this.levelRepository.findById(id);

      if (!level) {
        throw new Error('Level not found');
      }

      const updatedLevel = await this.levelRepository.update(id, {
        nivel: nivel ?? level.nivel,
      });

      return updatedLevel;
    } catch (error) {
      console.error("Erro ao atualizar nível:", error);
      throw new Error("Não foi possível atualizar o nível. Por favor, tente novamente.");
    }
  }
}

export { UpdateLevel };