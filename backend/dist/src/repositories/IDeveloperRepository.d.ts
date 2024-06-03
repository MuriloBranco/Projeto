import { FindOneOptions } from 'typeorm';
import { Developers } from '../entity/developers';
interface IDeveloperDTO {
    id: number;
    nivel_id: string;
    nome: string;
    sexo: string;
    data_nascimento: Date;
    idade: number;
    hobby: string;
}
interface IDeveloperRepository {
    findById(id: number): Promise<Developers | undefined>;
    save(item: any): Promise<Developers>;
    insert(nivel_id: IDeveloperDTO): Promise<Partial<Developers>>;
    findOneOrFailCustom(options: FindOneOptions<Developers>, error: any): Promise<Developers>;
}
export { IDeveloperRepository, IDeveloperDTO };
