"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const developers_1 = require("../../entity/developers");
const data_source_1 = require("../../data-source");
class DevelopersRepository {
    constructor() {
        this.ormRepository = data_source_1.AppDataSource.getRepository(developers_1.Developers);
    }
    findById(id) {
        const developer = this.ormRepository.findOne({ where: { id } });
        return developer;
    }
    save(item) {
        const developer = this.ormRepository.save(item);
        return developer;
    }
    async insert(nivel_id) {
        const developer = this.ormRepository.create(nivel_id);
        await this.ormRepository.save(developer);
        return developer;
    }
    findOneOrFailCustom(options, error) {
        const developer = this.ormRepository.findOneOrFail(options).catch(() => {
            throw error;
        });
        return developer;
    }
}
exports.default = DevelopersRepository;
//# sourceMappingURL=DeveloperRepository.js.map