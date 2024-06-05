import { Developers } from '../../models/developers';
import { IDeveloperRepository } from '../../repositories/IDeveloperRepository';

interface IRequest {
    query?: string;
    page: number;
    pageSize: number;
  }

class FindAllDevelopers {
    constructor(private DeveloperRepository: IDeveloperRepository) {}
    
    async execute({ query, page, pageSize }: IRequest): Promise<{ developers: Developers[], totalPages: number }> {
        const [developers, totaldevelopers] = await this.DeveloperRepository.findAndCountDevelopers(query || '', page, pageSize);

        const totalPages = Math.ceil(totaldevelopers / pageSize);

        return { developers, totalPages };
    }
}

export { FindAllDevelopers };