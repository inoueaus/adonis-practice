import Chatroom from "App/Models/Chatroom";
import Message from "App/Models/Message";
import User from "App/Models/User";
import Ws from "App/Services/Ws";
import { Socket } from "socket.io";

//start socketio
Ws.boot();

Ws.io.on("connection", async (socket: Socket) => {
  console.log("WebSocket Connected!");
  //userId will be sent in headers with tag userid
  const userIdString = socket.request.headers.userid;
  //must convert userId to number for use with database
  const userId = Number(userIdString);
  const token = socket.request.headers.token;
  const chatroomIdString = socket.request.headers.chatroomid;
  const chatroomId = Number(chatroomIdString);

  //join specified room
  //must check that the chatroom id is received or display error
  if (typeof chatroomIdString === "string" && typeof userId === "number") {
    const user = await User.find(userId);

    if (user) {
      //create association in database with chatroom
      user.joinChatroom(chatroomId);
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
    }

    socket.on("message", async (data) => {
      if (typeof data.message === "string") {
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
        Ws.io.in(chatroomIdString as string).emit("message", savedMessage);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("CLIENT DISCONNECTED: ", reason);
    });
  } else {
    console.log("chatroomId not received");
  }

  console.log(userId, token, chatroomId);
});
