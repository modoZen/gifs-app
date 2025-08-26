import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyCounterApp } from "./MyCounterApp";

describe("MyCounterApp tests", () => {
  it("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 0"
    );
    expect(screen.getByRole("button", { name: "+1" }));
    expect(screen.getByRole("button", { name: "-1" }));
    expect(screen.getByRole("button", { name: "Reset" }));
  });

  it("should increment the count when +1 button is clicked", async () => {
    const user = userEvent.setup();
    render(<MyCounterApp />);

    const count = screen.getByRole("heading", { level: 1 });
    const addButton = screen.getByRole("button", { name: "+1" });

    await user.click(addButton);

    expect(count.innerHTML).toBe("counter: 1");
  });

  it("should decrement the count when -1 button is clicked", async () => {
    const user = userEvent.setup();
    render(<MyCounterApp />);

    const count = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });

    await user.click(button);

    expect(count.innerHTML).toBe("counter: -1");
  });
});
