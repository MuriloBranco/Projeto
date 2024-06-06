import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDevelopersTable1717194064652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'developers',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
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
                {
                  name: 'level',
                  type: 'integer',
                  isNullable: false,
                },
            
              ],
            }),
          );
          await queryRunner.createForeignKeys('developers', [
            new TableForeignKey({
              columnNames: ['level'],
              referencedColumnNames: ['id'],
              referencedTableName: 'levels',
            }),
          ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('developers');
    }

}