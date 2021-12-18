import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Messages extends BaseSchema {
  protected tableName = "messages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("chatroom_id").unsigned().references("chatrooms.id").onDelete("CASCADE");
      table.integer("user_id").unsigned().references("users.id");

      table.string("content");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
