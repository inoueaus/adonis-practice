import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersChatrooms extends BaseSchema {
  protected tableName = "users_chatrooms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("user_id").unsigned().notNullable().references("users");

      table
        .integer("chatroom_id")
        .unsigned()
        .notNullable()
        .references("chatrooms");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
