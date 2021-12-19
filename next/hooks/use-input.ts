import { useState, useRef, RefObject } from "react";

type UseInput = (validator: (input: string) => string | boolean) => {
  ref: RefObject<HTMLInputElement>;
  isValid: boolean;
  validateAndReturnString: () => string | boolean;
  reset: () => void;
};

const useInput: UseInput = (validator) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);

  const validateAndReturnString = () => {
    if (ref.current) {
      const validatorResult = validator(ref.current.value.trim());
      if (validatorResult) {
        return validatorResult;
      }
    }
    setIsValid(false);
    return false;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.value = "";
    }
    setIsValid(true);
  }

  return { ref, isValid, validateAndReturnString, reset }
};

export default useInput;
