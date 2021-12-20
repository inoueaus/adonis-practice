import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import io, { Socket } from "socket.io-client";
import Card from "../../components/UI/Card";
import useInput from "../../hooks/use-input";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import ServerMessage from "../../models/server-message";
import MessageModel from "../../models/message-model";

const Chatroom: NextPage = () => {
  const context = useContext(AuthContext);
  const router = useRouter();

  const messageRef = useInput((value) => value);

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [SocketIO, setSocketIO] = useState<Socket>();

  const chatroomId = router.query.chatroomId;

  useEffect(() => {
    let socket: Socket;

    if (
      typeof context.token === "string" &&
      typeof context.userId === "number" &&
      chatroomId
    ) {
      //header values must be converted to a string
      socket = io("http://localhost:3333/", {
        extraHeaders: {
          token: context.token,
          userId: String(context.userId),
          chatroomId: String(chatroomId),
        },
      });
      socket.on("joined", (data) => {
        console.log("IO JOINED EVENT", data);
        //load all previous messages
        const prevMessages = data.messages as ServerMessage[];
        const formattedMessages: MessageModel[] = [];
        prevMessages.forEach((message) => {
          formattedMessages.push({
            sender: message.user_id,
            content: message.content,
            id: message.id,
          });
        });
        setMessages(formattedMessages);
      });
      socket.on("message", (message: ServerMessage) => {
        setMessages((prev) => [
          ...prev,
          { id: message.id, content: message.content, sender: message.user_id },
        ]);
      });
      setSocketIO(socket);
    }
    return () => {
      //disconnect if connected when leaving page
      if (socket) {
        socket.disconnect();
      }
    };
  }, [context.token, context.userId, chatroomId]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageRef.ref.current) {
      const message = messageRef.validateAndReturnString();
      SocketIO!.emit("message", { message });
    }
  };
  return (
    <>
      <Card>Chatroom ID: {chatroomId}</Card>
      <Card>
        <h5>New Message</h5>
        <form onSubmit={sendMessage}>
          <Input
            name="message"
            type="text"
            ref={messageRef.ref}
            label="Message"
            isValid={messageRef.isValid}
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>
      <Card>
        <h5>Messages</h5>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default Chatroom;