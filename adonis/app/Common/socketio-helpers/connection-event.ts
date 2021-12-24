import { Socket } from "socket.io";
import User from "App/Models/User";
import Chatroom from "App/Models/Chatroom";
import Message from "App/Models/Message";
import Ws from "App/Services/Ws";
import { SocketUserDataModel } from "../models/socket-user-data-model";

//join specified room
export default async function connectionEvent(
  socket: Socket,
  userData: SocketUserDataModel
) {
  const chatroomIdString = String(userData.chatroomId);
  const { userId, chatroomId, token } = userData;
  //must check that the chatroom id is received or display error

  const user = await User.find(userId);

  if (user) {
    //create association in database with chatroom
    user.joinChatroom(chatroomId!);
    const chatroom = await Chatroom.find(chatroomId);
    if (chatroom) {
      //load messages with user info
      const messagesQuery = await Message.query()
        .where("chatroom_id", chatroom.id)
        .orderBy("created_at", "desc")
        .limit(10)
        .preload("user");
      //remove passwords from messages
      messagesQuery.forEach((message) => (message.user.password = "secret"));
      //reverse order for easy mapping in react
      messagesQuery.reverse();
      //join chatroom with unique room id
      socket.join(chatroomIdString);
      //send to all users in same chatroom including user
      Ws.io.in(chatroomIdString).emit("joined", {
        data: "Joined",
        userId,
        token,
        chatroomId,
        messages: messagesQuery,
      });
    }
  } else {
    socket.disconnect();
    throw Error("User ID is not in Database.");
  }
}
