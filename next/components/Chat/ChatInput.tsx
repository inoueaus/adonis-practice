import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import React, { useRef } from "react";

const ChatInput: React.FC<{ sendMessage: (content: string) => void }> = ({ sendMessage }) => {
  const contentRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    if (contentRef.current) {
      const content = contentRef.current.value.trim();
      if (content) {
        sendMessage(content);
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
    <Card>
      
      <Button type="submit">Send</Button>
    </Card>
    </form>
  );
};

export default ChatInput;