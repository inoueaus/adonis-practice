import Card from "components/UI/Card";
import MessageModel from "models/message-model";
import React from "react";

import styles from "./ChatBox.module.css";
import MessageItem from "./MessageItem";

const ChatBox: React.FC<{ messages: MessageModel[] }> = ({ messages }) => {
  return (
    <Card>
      <ul className={styles.chatbox}>
        {messages.map(message => <MessageItem key={message.id} message={message} />)}
      </ul>
    </Card>
  );
};

export default ChatBox