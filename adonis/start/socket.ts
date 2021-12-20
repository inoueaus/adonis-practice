import Ws from "App/Services/Ws";
import { Socket } from "socket.io";

//start socketio
Ws.boot();


Ws.io.on("connection",(socket: Socket) => {
  console.log("WebSocket Connected!");
  socket.emit("joined", { message: "User connected!" });
})