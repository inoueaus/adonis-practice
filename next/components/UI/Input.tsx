import React from "react";

import styles from "./Input.module.css";

type InputProps = {
  type: "text" | "date" | "email" | "password";
  label: string;
  name: string;
  isValid: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <div className={`${styles["form-control"]} ${!props.isValid && styles["form-control__invalid"]}`}>
        <label htmlFor={props.name}>{props.label}</label>
        <input id={props.name} name={props.name} type={props.type} ref={ref} autoComplete="no" />
      </div>
    );
  }
);

export default Input;
