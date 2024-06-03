import { IDeveloperRepository, IDeveloperDTO } from "../IDeveloperRepository";
import { Developers } from "../../entity/developers";
declare class DevelopersRepository implements IDeveloperRepository {
    private ormRepository;
    constructor();
    findById(id: number): Promise<Developers | undefined>;
    save(item: IDeveloperDTO): Promise<Developers>;
    insert(nivel_id: IDeveloperDTO): Promise<Developers>;
    findOneOrFailCustom(options: any, error: any): Promise<Developers>;
}
export default DevelopersRepository;
