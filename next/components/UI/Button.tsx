import React from "react";

import styles from "./Button.module.css";

const Button: React.FC<{ type?: "button" | "submit"; onClick?: () => void }> = (
  props
) => {
  return (
    <button className={styles.button} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
