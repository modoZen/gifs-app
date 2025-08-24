import { useState } from "react";

export const MyCounterApp = () => {
  const counterValueInitial = 0;
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>counter: {counter}</h1>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
