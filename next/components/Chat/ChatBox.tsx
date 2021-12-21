import Card from "../UI/Card";
import MessageModel from "../../models/message-model";
import React, { useEffect, useRef } from "react";

import styles from "./ChatBox.module.css";
import MessageItem from "./MessageItem";

const ChatBox: React.FC<{ messages: MessageModel[] }> = ({ messages }) => {
  const bottomOfBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfBoxRef.current) {
      bottomOfBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card>
      <ul className={styles.chatbox}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomOfBoxRef}></div>
      </ul>
    </Card>
  );
};

export default ChatBox;
