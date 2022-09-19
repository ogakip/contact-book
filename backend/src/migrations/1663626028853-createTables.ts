import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663626028853 implements MigrationInterface {
    name = 'createTables1663626028853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "agent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_c65bbafdf6999275e2fd6a67452" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_c65bbafdf6999275e2fd6a67452"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "agent_id"`);
    }

}
