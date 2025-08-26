import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader tests", () => {
  it("should match snapshoot", () => {
    const title = "Buscador de Gifs";

    const { container } = render(<CustomHeader title={title} />);

    expect(container).toMatchSnapshot();
  });

  it("should render the description when provided", () => {
    const title = "Buscador de Gifs";
    const description = "Descubre y comparte el gif perfecto";

    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    const title = "Buscador de Gifs";

    render(<CustomHeader title={title} />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});
