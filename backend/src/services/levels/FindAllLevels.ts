import { Levels } from '../../models/levels';
import { ILevelRepository } from '../../repositories/ILevelRepository';

interface IRequest {
    query?: string;
    page: number;
    pageSize: number;
}

class FindAllLevels {
    constructor(private levelRepository: ILevelRepository) {}
    
    async execute({ query, page, pageSize }: IRequest): Promise<{ levels: Levels[], totalPages: number }> {
        const [levels, totalLevels] = await this.levelRepository.findAndCountLevels(query || '', page, pageSize);

        const totalPages = Math.ceil(totalLevels / pageSize);

        return { levels, totalPages };
    }
}

export { FindAllLevels };