import { Levels } from "../../models/levels";
import { ILevelRepository } from "../../repositories/ILevelRepository";

interface IRequest {
  nivel: string;
}



class CreateLevel {
    constructor(private levelRepository: ILevelRepository) {}

     async execute({ nivel }: IRequest): Promise<Levels> {

    const level = await this.levelRepository.create({nivel});

    return level;
  }
}

export { CreateLevel };