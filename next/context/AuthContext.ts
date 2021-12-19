import { createContext } from "react";
import ChatroomModel from "../models/chatroom-model";

export type AuthContextModel = {
  isAuth: boolean;
  token: string | null;
  username: string | null;
  chatrooms: ChatroomModel[] | null;
};

const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  token: null,
  username: null,
  chatrooms: null,
});

export default AuthContext;
