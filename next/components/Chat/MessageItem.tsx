import MessageModel from "models/message-model";
import React from "react";

const MessageItem: React.FC<{ message: MessageModel }> = ({ message }) => {
  return (
    <li>
      <h5>{message.username}</h5>
      <p>{message.content}</p>
    </li>
  );
}

export default MessageItem;