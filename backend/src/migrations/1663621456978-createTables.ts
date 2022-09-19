import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663621456978 implements MigrationInterface {
    name = 'createTables1663621456978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying(158) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "telephone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "last_name" character varying(158) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "first_name" character varying(158) NOT NULL`);
    }

}
