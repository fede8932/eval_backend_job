import { MigrationInterface, QueryRunner } from 'typeorm';

export class statusProyect1673635372601 implements MigrationInterface {
  name = 'statusProyect1673635372601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "proyecto" ALTER COLUMN "status" SET DEFAULT 'creado'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "proyecto" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }
}
