"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopersTable1717194064652 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopersTable1717194064652 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'developers',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'nivel_id',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'sexo',
                    type: 'char',
                    isNullable: false,
                },
                {
                    name: 'data_nascimento',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'idade',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'hobby',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createForeignKeys('developers', [
            new typeorm_1.TableForeignKey({
                columnNames: ['nivel_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'levels',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('developers');
    }
}
exports.CreateDevelopersTable1717194064652 = CreateDevelopersTable1717194064652;
//# sourceMappingURL=1717194064652-createDevelopersTable.js.map