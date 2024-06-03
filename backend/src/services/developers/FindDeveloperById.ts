import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";


interface IRequest {
    id: number;
}



class FindDeveloperById {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({id}: IRequest): Promise<Developers> {
    const developer = await this.developerRepository.findById(id);

    if (!developer) {
      throw new Error('Developer not found');
    }

    return developer;
  }
}

export { FindDeveloperById };