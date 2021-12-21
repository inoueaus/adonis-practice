import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import UsersChatroom from './UsersChatroom'

export default class Chatroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "room_name" })
  public roomName: string

  @hasMany(() => UsersChatroom)
  public usersChatroom: HasMany<typeof UsersChatroom>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
