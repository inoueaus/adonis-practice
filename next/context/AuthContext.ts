import { createContext } from "react";
import ChatroomModel from "../models/chatroom-model";

export type LoginHandler = (
  token: string,
  username: string,
  userId: number,
  chatrooms: ChatroomModel[]
) => void;

export type AuthContextModel = {
  isAuth: boolean;
  token: string | null;
  username: string | null;
  userId: number | null;
  chatrooms: ChatroomModel[] | null;
  loginHandler: LoginHandler
  logoutHandler: () => void;
};

const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  token: null,
  username: null,
  userId: null,
  chatrooms: null,
  loginHandler: () => {},
  logoutHandler: () => {},
});

export default AuthContext;
