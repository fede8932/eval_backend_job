import { MigrationInterface, QueryRunner } from 'typeorm';

export class incio1673462331093 implements MigrationInterface {
  name = 'incio1673462331093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "proyecto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_589bf061fd654da7076e68e1699" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "especialidad" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_aec2a5950913ac1bb4ac83ac3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "developer" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projecto_especialidad" ("proj_id" integer NOT NULL, "esp_id" integer NOT NULL, CONSTRAINT "PK_e70cdb2b7f8c409a97a8b22c08a" PRIMARY KEY ("proj_id", "esp_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a44361a20a86a499229dd300e" ON "projecto_especialidad" ("proj_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a309baaa8d5c68acd52faf6037" ON "projecto_especialidad" ("esp_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "devs_projects" ("dev_id" integer NOT NULL, "proj_id" integer NOT NULL, CONSTRAINT "PK_72fe376643ed3efbddfe6995a45" PRIMARY KEY ("dev_id", "proj_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2cee9a7300b5dfe948bc31a92c" ON "devs_projects" ("dev_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c581cff28a2667279d010e6f74" ON "devs_projects" ("proj_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "devs_especialidad" ("dev_id" integer NOT NULL, "esp_id" integer NOT NULL, CONSTRAINT "PK_582dc6def1d37f179501ef10928" PRIMARY KEY ("dev_id", "esp_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0577f38d4e1a6376de0e05a141" ON "devs_especialidad" ("dev_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72cdf8068c7d4ca76fa079dbd7" ON "devs_especialidad" ("esp_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "projecto_especialidad" ADD CONSTRAINT "FK_0a44361a20a86a499229dd300ef" FOREIGN KEY ("proj_id") REFERENCES "proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projecto_especialidad" ADD CONSTRAINT "FK_a309baaa8d5c68acd52faf60379" FOREIGN KEY ("esp_id") REFERENCES "especialidad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_projects" ADD CONSTRAINT "FK_2cee9a7300b5dfe948bc31a92cd" FOREIGN KEY ("dev_id") REFERENCES "developer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_projects" ADD CONSTRAINT "FK_c581cff28a2667279d010e6f74b" FOREIGN KEY ("proj_id") REFERENCES "proyecto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_especialidad" ADD CONSTRAINT "FK_0577f38d4e1a6376de0e05a141d" FOREIGN KEY ("dev_id") REFERENCES "developer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_especialidad" ADD CONSTRAINT "FK_72cdf8068c7d4ca76fa079dbd7b" FOREIGN KEY ("esp_id") REFERENCES "especialidad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devs_especialidad" DROP CONSTRAINT "FK_72cdf8068c7d4ca76fa079dbd7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_especialidad" DROP CONSTRAINT "FK_0577f38d4e1a6376de0e05a141d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_projects" DROP CONSTRAINT "FK_c581cff28a2667279d010e6f74b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devs_projects" DROP CONSTRAINT "FK_2cee9a7300b5dfe948bc31a92cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projecto_especialidad" DROP CONSTRAINT "FK_a309baaa8d5c68acd52faf60379"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projecto_especialidad" DROP CONSTRAINT "FK_0a44361a20a86a499229dd300ef"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72cdf8068c7d4ca76fa079dbd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0577f38d4e1a6376de0e05a141"`,
    );
    await queryRunner.query(`DROP TABLE "devs_especialidad"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c581cff28a2667279d010e6f74"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2cee9a7300b5dfe948bc31a92c"`,
    );
    await queryRunner.query(`DROP TABLE "devs_projects"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a309baaa8d5c68acd52faf6037"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0a44361a20a86a499229dd300e"`,
    );
    await queryRunner.query(`DROP TABLE "projecto_especialidad"`);
    await queryRunner.query(`DROP TABLE "developer"`);
    await queryRunner.query(`DROP TABLE "especialidad"`);
    await queryRunner.query(`DROP TABLE "proyecto"`);
  }
}
