import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import ChatApp from "../../components/Chat/ChatApp";

const Chatroom: NextPage = () => {
  const router = useRouter();

  const chatroomId = router.query.chatroomId;

  return <ChatApp chatroomId={chatroomId} />;
};

export default Chatroom;
