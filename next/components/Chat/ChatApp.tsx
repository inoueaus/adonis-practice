import React, { useEffect, useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import io, { Socket } from "socket.io-client";

import MessageModel from "../../models/message-model";
import ServerMessage from "../../models/server-message";

import AuthContext from "../../context/AuthContext";
import { HOST_PORT, HOST_URL } from "../../react-env";

import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ChatBox from "./ChatBox";

const ChatApp: React.FC<{ chatroomId: string | string[] | undefined }> = ({
  chatroomId,
}) => {
  const context = useContext(AuthContext);

  const messageRef = useInput((value) => value.trim());

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [SocketIO, setSocketIO] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let socket: Socket;
    setLoading(true);

    if (
      typeof context.token === "string" &&
      typeof context.userId === "number" &&
      chatroomId
    ) {
      //header values must be converted to a string
      socket = io(`ws://${HOST_URL}:${HOST_PORT}/`, {
        withCredentials: true,
        transports: ["websocket"],
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
      socket.on("send-credentials", (data) => {
        socket.emit("credentials", {
          userId: context.userId,
          token: context.token,
          chatroomId,
        });
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
      messageRef.ref.current.value = "";
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

export default ChatApp;
