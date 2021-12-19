import React, { useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const UserInput: React.FC<{ onSubmit: (username: string, roomName: string) => void }> = (props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (usernameRef.current && roomNameRef.current) {
      const usernameValue = usernameRef.current.value.trim();
      const roomNameValue = roomNameRef.current.value.trim();
      if (usernameValue && roomNameValue) {
        props.onSubmit(usernameValue, roomNameValue);
      }
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <Card>
        <Input type="text" name="username" ref={usernameRef} label="Username" />
        <Input type="text" name="room-name" ref={roomNameRef} label="Room Name" />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
};

export default UserInput;
