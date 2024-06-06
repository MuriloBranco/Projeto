import { ILevelRepository } from "../../repositories/ILevelRepository";

interface IDeleteLevelRequest {
    id: number;
}

class DeleteLevel {
  constructor(private levelRepository: ILevelRepository) {}

  async execute({ id }: IDeleteLevelRequest): Promise<void> {
    try {
      const level = await this.levelRepository.findById(id);

      if (!level) {
        throw new Error('Level not found');
      }

      const hasDevelopers = await this.levelRepository.hasAssociatedDevelopers(id);
      if (hasDevelopers) {
        throw new Error('Cannot delete level with associated developers');
      }

      await this.levelRepository.delete(id);
    } catch (error) {
      console.error("Erro ao deletar nível:", error);
      throw new Error("Não foi possível deletar o nível. Por favor, tente novamente.");
    }
  }
}

export { DeleteLevel };