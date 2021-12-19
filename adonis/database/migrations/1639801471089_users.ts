import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id", { primaryKey: true });
      table.string("username", 50).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("first_name", 255).nullable();
      table.string("last_name", 255).nullable();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
