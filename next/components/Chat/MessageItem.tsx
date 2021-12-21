import MessageModel from "../../models/message-model";
import React from "react";
import styles from "./ChatBox.module.css";

const MessageItem: React.FC<{ message: MessageModel }> = ({ message }) => {
  return (
    <li className={styles.item}>
      <div>
        <h5>{message.sender}</h5>
        <small>{message.createdAt.toLocaleTimeString()}</small>
      </div>
      <p>{message.content}</p>
    </li>
  );
};

export default MessageItem;
