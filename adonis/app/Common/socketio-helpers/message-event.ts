import Ws from "App/Services/Ws";
import Message from "App/Models/Message";
import { SocketUserDataModel } from "../models/socket-user-data-model";

export default async function messageEvent(
  data,
  userData: SocketUserDataModel
) {
  if (typeof data.message === "string") {
    const { userId, chatroomId } = userData;
    if (chatroomId && userId) {
      //does not have to be async
      //record message
      const newMessage = new Message();
      newMessage.content = data.message;
      newMessage.userId = userId;
      newMessage.chatroomId = chatroomId;
      const savedMessage = await newMessage.save();
      await savedMessage.load("user");
      savedMessage.user.password = "secret";
      //send message to room
      Ws.io.in(String(chatroomId)).emit("message", savedMessage);
    } else {
      throw Error(
        "Authentication (User Id and chatroom Id) not found. Message cannot be sent"
      );
    }
  } else {
    throw Error("Data type of message sent is not a string.");
  }
}
