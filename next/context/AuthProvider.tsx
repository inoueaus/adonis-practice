import React, { useEffect, useState } from "react";
import ChatroomModel from "../models/chatroom-model";
import AuthContext, { AuthContextModel, LoginHandler } from "./AuthContext";

const AuthProvider: React.FC = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [chatrooms, setChatrooms] = useState<ChatroomModel[] | null>(null);

  //save auth to local storage on change
  useEffect(() => {
    if (token && username && userId) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("username", username);
      //must convert userId to a string to store (and convert back on loading to number)
      const userIdString = String(userId);
      window.localStorage.setItem("userId", userIdString);
    }
  }, [token, username, userId]);

  //load auth if saved in local storage
  useEffect(() => {
    const localStoreUsername = window.localStorage.getItem("username");
    const localStoreToken = window.localStorage.getItem("token");
    //must convert to number
    const localStoreUserIdString = window.localStorage.getItem("userId");
    console.log(localStoreUserIdString, localStoreToken, localStoreUsername);

    if (localStoreToken && localStoreUsername && localStoreUserIdString) {
      setIsAuth(true);
      setToken(localStoreToken);
      setUsername(localStoreUsername);
      const localStoreUserIdNumber = Number(localStoreUserIdString);
      setUserId(localStoreUserIdNumber);
    }
  }, []);

  const loginHandler: LoginHandler = (token, username,  userId, chatrooms) => {
    setIsAuth(true);
    setChatrooms(chatrooms);
    setUserId(userId);
    setToken(token);
    setUsername(username);
  }

  const logoutHandler = () => {
    setIsAuth(false);
    setChatrooms([]);
    setUserId(null);
    setToken(null);
    setUsername(null);
    //clear local storage
    window.localStorage.clear();
  }

  const providerValue: AuthContextModel = {
    isAuth,
    token,
    username,
    userId,
    chatrooms,
    loginHandler,
    logoutHandler,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
