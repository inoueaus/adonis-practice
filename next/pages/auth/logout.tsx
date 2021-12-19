import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const Logout: NextPage = () => {
  const context = useContext(AuthContext);

  //logout on page load
  useEffect(() => {
    context.setChatrooms([]);
    context.setIsAuth(false);
    context.setToken(null);
    context.setUserId(null);
    context.setUsername(null);
  }, []);
  return <div></div>;
};

export default Logout;
