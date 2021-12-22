import type { NextPage } from "next";
import React, { useContext, useState } from "react";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import AuthContext from "../../context/AuthContext";
import useInput from "../../hooks/use-input";
import authFetch from "../../helpers/auth-fetch";
import { useRouter } from "next/router";
import { usernameValidator } from "../../helpers/validators";

const Login: NextPage = () => {
  const context = useContext(AuthContext);
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);

  const usernameRef = useInput(usernameValidator);
  const passwordRef = useInput((value) => value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const username = usernameRef.validateAndReturnString();
    const password = passwordRef.validateAndReturnString();

    //only boolean when validation fails; is a string if passes
    if (typeof username === "string" && typeof password === "string") {
      //must run authFetch in async mode
      (async () => {
        const authResults = await authFetch("login", username, password);
        if (authResults) {
          //must add loading chatrooms
          context.loginHandler(
            authResults.token,
            authResults.username,
            authResults.userId,
            []
          );
          router.replace("/");
        } else {
          setAuthError("Invalid password or username.");
        }
      })();
    }
  };
  return (
    <>
      <Card>
        <h1>Login</h1>
        {authError && <p style={{ color: "red" }}>{authError}</p>}
      </Card>
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username"
            type="text"
            isValid={usernameRef.isValid}
            ref={usernameRef.ref}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            isValid={passwordRef.isValid}
            ref={passwordRef.ref}
          />
          <Button type="submit">Register</Button>
        </form>
      </Card>
    </>
  );
};

export default Login;
