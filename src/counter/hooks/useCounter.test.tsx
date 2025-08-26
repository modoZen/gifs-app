import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "./useCounter";

const renderUseCounter = (initialValue: number = 0) => {
  return renderHook(() => useCounter(initialValue));
};

describe("useCounter", () => {
  it("should initialize with default value of 0", () => {
    const { result } = renderUseCounter();

    expect(result.current.counter).toBe(0);
  });

  it("should initialize with value of 12", () => {
    const initialValue = 12;

    const { result } = renderUseCounter(initialValue);
    expect(result.current.counter).toBe(initialValue);
  });

  it("should increment counter when handleAdd is calles", () => {
    const { result } = renderUseCounter();

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(1);
  });

  it("should decrement counter when handleAdd is called", () => {
    const { result } = renderUseCounter(1);

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(0);
  });

  it("should reset counter when handleAdd is called", () => {
    const { result } = renderUseCounter(10);

    act(() => {
      result.current.handleAdd();
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(10);
  });
});
