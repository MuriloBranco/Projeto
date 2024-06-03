import { ILevelRepository } from "../../repositories/ILevelRepository";
import { Levels } from "../../models/levels";

interface IRequest {
    id: number;
    nivel: string;

}

class UpdateLevel {
  constructor(private levelRepository: ILevelRepository) {}

  async execute({ id, nivel }: IRequest): Promise<Levels> {
    const level = await this.levelRepository.findById(id);


    const updatedLevel = await this.levelRepository.update(id, {
      nivel: nivel ?? level.nivel,

    });

    return updatedLevel;
  }
}

export { UpdateLevel };