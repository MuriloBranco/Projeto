import { Levels } from "../../models/levels";
import { ILevelRepository } from "../../repositories/ILevelRepository";

interface ICreateLevelRequest {
  nivel: string;
}



class CreateLevel {
    constructor(private levelRepository: ILevelRepository) {}

     async execute({ nivel }: ICreateLevelRequest): Promise<Levels> {
      try {
        const level = await this.levelRepository.create({ nivel });
        return level;
      } catch (error) {
        console.error("Erro ao criar nível:", error);
        throw new Error("Não foi possível criar o nível. Por favor, tente novamente.");
      }
    }
}

export { CreateLevel };