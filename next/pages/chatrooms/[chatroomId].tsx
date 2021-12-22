import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import ChatApp from "../../components/Chat/ChatApp";
import AuthContext from "../../context/AuthContext";

const Chatroom: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const chatroomId = router.query.chatroomId;

  return <ChatApp chatroomId={chatroomId} />;
};

export default Chatroom;
