import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1624617327087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "password",
        type: "varchar",
        isNullable: true,
      })
    );
    4;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "password");
  }
}
