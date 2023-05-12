import { MigrationInterface, QueryRunner } from 'typeorm'

export class OtpSecret1683736176187 implements MigrationInterface {
  name = 'OtpSecret1683736176187'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "otpSecret" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otpSecret"`)
  }
}
