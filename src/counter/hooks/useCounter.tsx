import { useState } from "react";

export const useCounter = (counterValueInitial = 0) => {
  const [counter, setCounter] = useState(counterValueInitial);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubtract = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(counterValueInitial);
  };

  return {
    counter,
    handleAdd,
    handleSubtract,
    handleReset,
  };
};
