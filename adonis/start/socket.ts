import Ws from "App/Services/Ws";
import { Socket } from "socket.io";
import Logger from "@ioc:Adonis/Core/Logger";
import messageEvent from "App/Common/socketio-helpers/message-event";
import connectionEvent from "App/Common/socketio-helpers/connection-event";
import { SocketUserDataModel } from "App/Common/models/socket-user-data-model";
import tokenCheck from "App/Common/socketio-helpers/token-check";

//start socketio
Ws.boot();

Ws.io.on("connection", async (socket: Socket) => {
  Logger.info(
    `Connected request info: ${JSON.stringify(socket.handshake.headers)}`
  );
  //object to store socket userData
  const userData: SocketUserDataModel = { socketId: socket.id };

  //send an event to user to send credentials after connection established
  Ws.io.to(userData.socketId).emit("send-credentials");

  try {
    socket.on("credentials", async (data) => {
      const userId = data.userId;
      const token = data.token;
      const chatroomId = Number(data.chatroomId);
      if (
        typeof userId === "number" &&
        typeof token === "string" &&
        typeof chatroomId === "number"
      ) {
        //register user data to object for use when sending messages
        userData.userId = userId;
        userData.token = token;
        userData.chatroomId = chatroomId;

        //should check token here later
        const isAuth = await tokenCheck(userData.token, userId);
        if (isAuth) {
          Logger.info(JSON.stringify(userData));
          connectionEvent(socket, userData);
        } else {
          throw Error("Authentication failed");
        }
      } else {
        throw Error("Variable types sent from user not correct.");
      }
    });
  } catch (error) {
    console.log(error);
    Logger.error(error);
  }

  socket.on("message", async (data) => {
    messageEvent(data, userData);
  });

  socket.on("disconnect", (reason) => {
    Logger.info(`CLIENT DISCONNECTED: ${reason}`);
  });
});
