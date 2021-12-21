import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import AuthContext from "../../context/AuthContext";
import authFetch from "../../helpers/auth-fetch";
import { usernameValidator } from "../../helpers/validators";
import useInput from "../../hooks/use-input";

const Register: NextPage = () => {
  const { loginHandler } = useContext(AuthContext);
  const router = useRouter();

  const usernameRef = useInput(usernameValidator);
  const passwordRef = useInput((value) => value);
  const passConfRef = useInput((value) => value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      usernameRef.ref.current &&
      passwordRef.ref.current &&
      passConfRef.ref.current
    ) {
      const username = usernameRef.validateAndReturnString();
      const password = passwordRef.validateAndReturnString();
      const passConf = passConfRef.validateAndReturnString();
      if (username && password === passConf) {
        //Execute async function here
        (async () => {
          const authResults = await authFetch(
            "register",
            username as string,
            password as string
          );
          if (authResults) {
            loginHandler(
              authResults.token,
              authResults.username,
              authResults.userId,
              []
            );
          }
        })();
        router.replace("/");
      }
    }
  };
  return (
    <>
      <Card>
        <h1>Register</h1>
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
          <Input
            name="password_confirm"
            label="Confirm Password"
            type="password"
            isValid={passConfRef.isValid}
            ref={passConfRef.ref}
          />
          <Button type="submit">Register</Button>
        </form>
      </Card>
    </>
  );
};

export default Register;
