import { Levels } from '../../models/levels';
import { ILevelRepository } from '../../repositories/ILevelRepository';

interface IFindAllLevelsRequest {
    query?: string;
    page: number;
    pageSize: number;
  }
  
  interface IFindAllLevelsResponse {
    levels: Levels[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  }

  class FindAllLevels {
    constructor(private levelRepository: ILevelRepository) {}
  
    async execute({ query, page, pageSize }: IFindAllLevelsRequest): Promise<IFindAllLevelsResponse> {
      const { levels, total, currentPage, lastPage } = await this.levelRepository.findAndCountLevels(query || '', page, pageSize);
  
      return {
        levels,
        total,
        perPage: pageSize,
        currentPage,
        lastPage
      };
    }
  }
  
  export { FindAllLevels };