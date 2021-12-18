import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Chatroom from "./Chatroom";

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public content: string;

  @column({ columnName: "user_id" })
  public userId: number

  @column({ columnName: "chatroom_id" })
  public chatroomId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Chatroom)
  public chatroom: BelongsTo<typeof Chatroom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
