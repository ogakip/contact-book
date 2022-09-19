import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663627250912 implements MigrationInterface {
    name = 'createTables1663627250912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_c65bbafdf6999275e2fd6a67452"`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "agent_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984"`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "user_id" TO "agent_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_c65bbafdf6999275e2fd6a67452" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
