"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopersTable1717190222136 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopersTable1717190222136 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'levels',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'nivel',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('levels');
    }
}
exports.CreateDevelopersTable1717190222136 = CreateDevelopersTable1717190222136;
//# sourceMappingURL=1717191180901-createLevelsTable.js.map