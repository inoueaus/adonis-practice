import { createContext } from "react";

export type AuthContextModel = {
  isAuth: boolean;
  token: string | null;
  username: string | null;
  chatrooms: { name: string; id: number }[] | null;
};

const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  token: null,
  username: null,
  chatrooms: null,
});

export default AuthContext;
