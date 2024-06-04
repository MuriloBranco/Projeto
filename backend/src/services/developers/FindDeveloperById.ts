import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";


interface IRequest {
    id: number;
}



class FindDeveloperById {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({id}: IRequest): Promise<Developers> {
    try {
      const developer = await this.developerRepository.findById(id);

      if (!developer) {
        throw new Error('Developer not found');
      }

      return developer;
    } catch (error) {
      console.error("Erro ao encontrar desenvolvedor:", error);
      throw new Error("Não foi possível encontrar o desenvolvedor. Por favor, tente novamente.");
    }
  }
}

export { FindDeveloperById };