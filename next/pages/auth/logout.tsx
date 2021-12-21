import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import Card from "../../components/UI/Card";
import AuthContext from "../../context/AuthContext";
import logoutFetch from "../../helpers/logout-fetch";

const Logout: NextPage = () => {
  const context = useContext(AuthContext);

  //logout on page load
  useEffect(() => {
    logoutFetch(context.token as string);
    context.logoutHandler();
  }, [context.logoutHandler, context.token]);
  return (
    <Card>
      <h1>Logged out!</h1>
    </Card>
  );
};

export default Logout;
