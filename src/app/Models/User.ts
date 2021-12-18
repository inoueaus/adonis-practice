import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import UsersChatroom from "./UsersChatroom";
import Message from "./Message";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public password: string;

  @column({ columnName: "first_name" })
  public firstName: string | null;

  @column({ columnName: "last_name" })
  public lastName: string | null;

  @hasMany(() => UsersChatroom)
  public userChatroom: HasMany<typeof UsersChatroom>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
