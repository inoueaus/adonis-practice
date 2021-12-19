import type { NextPage } from "next";
import React, { useRef } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import useInput from "../../hooks/use-input";

const Register: NextPage = () => {
  const usernameRef = useInput((value) => value);
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
      if (username && password && passConf) {
        
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
