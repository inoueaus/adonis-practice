import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import AuthContext from "../context/AuthContext";
import joinChatroomFetch from "../helpers/join-chatroom-fetch";
import useInput from "../hooks/use-input";
import ChatroomModel from "../models/chatroom-model";

const Home: NextPage = () => {
  const context = useContext(AuthContext);
  const router = useRouter();

  const chatroomNameRef = useInput((value: string) => {
    if (value.length < 50) {
      return value;
    }
    return false;
  });

  const joinChatroom = (event: React.FormEvent) => {
    event.preventDefault();
    if (chatroomNameRef.ref.current) {
      const chatroomName = chatroomNameRef.validateAndReturnString();
      if (
        typeof chatroomName === "string" &&
        typeof context.token === "string" &&
        typeof context.userId === "number"
      ) {
        (async () => {
          const roomInfo = await joinChatroomFetch(context.token as string, chatroomName, context.userId as number);
          //redirect if room join was successful
          if (roomInfo) {
            const roomId = roomInfo.id as number;
            const newChatroom: ChatroomModel = { name: roomInfo.room_name, id: roomId }
            context.setChatrooms([newChatroom]);
            router.push(`/chatrooms/${roomId}`);
          }
        })();
      }
    }
  };

  return (
    <>
      <Card>Welcome</Card>
      <Card>
        {context.isAuth ? (
          <form onSubmit={joinChatroom}>
            <Input
              name="chatroom-name"
              type="text"
              label="Chatroom Name"
              ref={chatroomNameRef.ref}
              isValid={chatroomNameRef.isValid}
            />
            <Button type="submit">Join Room</Button>
          </form>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </Card>
    </>
  );
};

export default Home;
