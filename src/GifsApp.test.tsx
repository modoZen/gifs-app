import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { GifsApp } from "./GifsApp";

describe("GifsApp tests", () => {
  it("should match snapshoot", () => {
    const { container } = render(<GifsApp />);

    expect(container).toMatchSnapshot();
  });
});
