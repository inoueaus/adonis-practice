import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AddCascadeToUsersChatrooms extends BaseSchema {
  protected tableName = "users_chatrooms";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("chatroom_id");
      // table
      //   .integer("chatroom_id")
      //   .unsigned()
      //   .references("chatrooms.id")
      //   .onDelete("CASCADE");
      table.dropColumn("user_id");
      // table
      //   .integer("user_id")
      //   .unsigned()
      //   .references("users.id")
      //   .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
