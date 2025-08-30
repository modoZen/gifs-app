import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar tests", () => {
  it("should match the snapshoot", () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it("should call onSearch after 700ms when writing the correct value", async () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalled();
      expect(onSearchMock).toHaveBeenCalledWith("test");
    });
  });

  // it("should call onSearch after 700ms when writing the correct value", async () => {
  //   const user = userEvent.setup();
  //   const onSearchMock = vi.fn();
  //   render(<SearchBar onSearch={onSearchMock} />);

  //   const input = screen.getByRole("textbox");

  //   await user.type(input, "test");

  //   // await new Promise((resolve) => setTimeout(resolve, 700));

  //   await waitFor(() => {
  //     expect(onSearchMock).toHaveBeenCalled();
  //     expect(onSearchMock).toHaveBeenCalledWith("test");
  //   });
  // });

  it("should call only once with the last value (debounce)", async () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith("test");
      expect(onSearchMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onSearch when the button clicked with the input value", () => {
    const onSearchMock = vi.fn();
    const query = "test";
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: query } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith(query);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  // it("should call onSearch when the button clicked with the input value", async () => {
  //   const user = userEvent.setup();
  //   const onSearchMock = vi.fn();
  //   const query = "test";
  //   render(<SearchBar onSearch={onSearchMock} />);

  //   const input = screen.getByRole("textbox");
  //   const button = screen.getByRole("button");

  //   await user.type(input, query);
  //   await user.click(button);

  //   expect(onSearchMock).toHaveBeenCalledWith(query);
  //   expect(onSearchMock).toHaveBeenCalledTimes(1);
  // });

  it("should the input has the correct placeholder value", () => {
    const placeholder = "test";
    render(<SearchBar onSearch={vi.fn()} placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
  });
});
