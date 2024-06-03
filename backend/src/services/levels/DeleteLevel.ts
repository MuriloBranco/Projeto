import { ILevelRepository } from "../../repositories/ILevelRepository";

interface IRequest {
    id: number;
}

class DeleteLevel {
  constructor(private levelRepository: ILevelRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const level = await this.levelRepository.findById(id);

    if (!level) {
      throw new Error('Developer not found');
    }

    await this.levelRepository.delete(id);
  }
}

export { DeleteLevel };