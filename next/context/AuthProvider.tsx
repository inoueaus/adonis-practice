import React, { useState } from "react";
import ChatroomModel from "../models/chatroom-model";
import AuthContext, { AuthContextModel } from "./AuthContext";

const AuthProvider: React.FC = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [chatrooms, setChatrooms] = useState<ChatroomModel[] | null>(null);

  const providerValue: AuthContextModel = {
    isAuth,
    token,
    username,
    chatrooms,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
