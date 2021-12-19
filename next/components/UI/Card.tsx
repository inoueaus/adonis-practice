import React from "react";

import styles from "./Card.module.css";

type CardProps = {
  display?: "flex-column" | "flex-row";
  marginBottom?: number;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`${styles.card} ${props.display && styles[props.display]}`}
      style={{ marginBottom: props.marginBottom && `${props.marginBottom}rem` }}
    >
      {props.children}
    </div>
  );
};

export default Card;
