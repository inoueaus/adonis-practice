import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";

import { HOST_URL, HOST_PORT } from "../../react-env";
import ServerMessage from "../../models/server-message";
import MessageModel from "../../models/message-model";

import useInput from "../../hooks/use-input";
import AuthContext from "../../context/AuthContext";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import ChatBox from "../../components/Chat/ChatBox";

const Chatroom: NextPage = () => {
  const context = useContext(AuthContext);
  const router = useRouter();

  const messageRef = useInput((value) => value);

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [SocketIO, setSocketIO] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);

  const chatroomId = router.query.chatroomId;

  useEffect(() => {
    let socket: Socket;
    setLoading(true);

    if (
      typeof context.token === "string" &&
      typeof context.userId === "number" &&
      chatroomId
    ) {
      //header values must be converted to a string
      socket = io(`http://${HOST_URL}:${HOST_PORT}/`, {
        extraHeaders: {
          token: context.token,
          userId: String(context.userId),
          chatroomId: String(chatroomId),
        },
      });
      socket.on("joined", (data) => {
        //load all previous messages
        const prevMessages = data.messages as ServerMessage[];
        const formattedMessages: MessageModel[] = [];
        prevMessages.forEach((message) => {
          formattedMessages.push({
            sender: message.user.username,
            content: message.content,
            id: message.id,
            createdAt: new Date(message.created_at),
          });
        });
        setMessages(formattedMessages);
        setLoading(false);
      });
      socket.on("message", (message: ServerMessage) => {
        setMessages((prev) => [
          ...prev,
          {
            id: message.id,
            content: message.content,
            sender: message.user.username,
            createdAt: new Date(message.created_at),
          },
        ]);
      });
      setSocketIO(socket);
    }
    return () => {
      //disconnect if connected when leaving page
      if (socket) {
        socket.disconnect();
        setSocketIO(null);
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
      <ChatBox messages={messages} loading={loading} />
      <Card>
        <form onSubmit={sendMessage}>
          <Input
            name="message"
            type="text"
            ref={messageRef.ref}
            label="New Message"
            isValid={messageRef.isValid}
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>
    </>
  );
};

export default Chatroom;
