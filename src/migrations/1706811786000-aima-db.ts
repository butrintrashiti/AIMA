import { MigrationInterface, QueryRunner } from "typeorm";

export class AimaDb1706811786000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('aima', true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
