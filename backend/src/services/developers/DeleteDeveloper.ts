import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";

interface IRequest {
    id: number;
}

class DeleteDeveloper {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    try {
      const developer = await this.developerRepository.findById(id);

      if (!developer) {
        throw new Error('Developer not found');
      }

      await this.developerRepository.delete(id);
    } catch (error) {
      console.error("Erro ao deletar desenvolvedor:", error);
      throw new Error("Não foi possível deletar o desenvolvedor. Por favor, tente novamente.");
    }
  }
}

export { DeleteDeveloper };