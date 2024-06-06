import { Developers } from '../../models/developers';
import { IDeveloperRepository } from '../../repositories/IDeveloperRepository';

interface IRequest {
  query?: string;
  page: number;
  pageSize: number;
}

interface IResponse {
  developers: Developers[];
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

class FindAllDevelopers {
  constructor(private developersRepository: IDeveloperRepository) {}

  public async execute({ query = '', page, pageSize }: IRequest): Promise<IResponse> {
    const { developers, total, currentPage, lastPage } = await this.developersRepository.findAndCountDevelopers(query, page, pageSize);

    return {
      developers,
      total,
      perPage: pageSize,
      currentPage,
      lastPage
    };
  }
}

export { FindAllDevelopers };
