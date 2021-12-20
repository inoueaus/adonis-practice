import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import UsersChatroom from "./UsersChatroom";
import Message from "./Message";
import Chatroom from "./Chatroom";

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
  public userChatroom: HasMany<typeof UsersChatroom>;

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //function to add chatroom to user
  public async joinChatroom(chatroomId: number) {
    //check if chatroom exists
    const chatroomExists = await Chatroom.find(chatroomId);

    if (chatroomExists) {
      const chatroomIsLinkedToUser = await UsersChatroom.findBy(
        "chatroom_id",
        chatroomExists.id
      );
      //make a connection in users_chatrooms table if not already in table
      if (!chatroomIsLinkedToUser) {
        const newUsersChatroomEntry = new UsersChatroom();
        newUsersChatroomEntry.userId = this.id;
        newUsersChatroomEntry.chatroomId = chatroomExists.id;
        const queryResults = await newUsersChatroomEntry.save();
        console.log(queryResults);
      }
    }
  }
}
