import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";

interface IRequest {
    id: number;
}

class DeleteDeveloper {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const developer = await this.developerRepository.findById(id);

    if (!developer) {
      throw new Error('Developer not found');
    }

    await this.developerRepository.delete(id);
  }
}

export { DeleteDeveloper };