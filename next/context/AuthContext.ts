import { createContext } from "react";
import ChatroomModel from "../models/chatroom-model";

export type AuthContextModel = {
  isAuth: boolean;
  token: string | null;
  username: string | null;
  userId: number | null;
  chatrooms: ChatroomModel[] | null;
  setIsAuth: (value: boolean) => void
  setToken: (value: string | null) => void
  setUsername: (value: string | null) => void
  setUserId: (value: number | null) => void
  setChatrooms: (chatroom: ChatroomModel[]) => void
};

const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  token: null,
  username: null,
  userId: null,
  chatrooms: null,
  setIsAuth: () => {},
  setToken: () => {},
  setUsername: () => {},
  setUserId: () => {},
  setChatrooms: () => {},
});

export default AuthContext;
