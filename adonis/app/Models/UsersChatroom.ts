import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Chatroom from "./Chatroom";

export default class UsersChatroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Chatroom)
  public chatroom: BelongsTo<typeof Chatroom>;

  @column({ columnName: "user_id" })
  public userId;

  @column({ columnName: "chatroom_id" })
  public chatroomId;
}
