import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDevelopersTable1717190222136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('levels');
    }

}
