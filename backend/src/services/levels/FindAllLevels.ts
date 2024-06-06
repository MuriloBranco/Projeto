import { Levels } from '../../models/levels';
import { ILevelRepository } from '../../repositories/ILevelRepository';

interface IFindAllLevelsRequest {
    query?: string;
    page: number;
    pageSize: number;
}

class FindAllLevels {
    constructor(private levelRepository: ILevelRepository) {}
    
    async execute({ query, page, pageSize }: IFindAllLevelsRequest): Promise<{ levels: Levels[], totalPages: number }> {
        const [levels, totalLevels] = await this.levelRepository.findAndCountLevels(query || '', page, pageSize);

        const totalPages = Math.ceil(totalLevels / pageSize);

        return { levels, totalPages };
    }
}

export { FindAllLevels };