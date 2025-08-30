import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsAction from "../actions/get-gifs-by-query.action";
import { mockGifs } from "../../mocks/gifs.mock";

const renderUseGifs = () => {
  return renderHook(() => useGifs());
};

describe("useGifs tests", () => {
  it("should return default values and methods", () => {
    const { result } = renderUseGifs();

    expect(result.current.gifs).toHaveLength(0);
    expect(result.current.previousTerms.length).toBe(0);
  });

  it("should return a list of gifs", async () => {
    vi.spyOn(gifsAction, "getGifsByQuery").mockResolvedValueOnce(mockGifs);

    const { result } = renderUseGifs();

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    // expect(result.current.gifs).toHaveLength(10);
    expect(result.current.gifs).toHaveLength(mockGifs.length);
  });

  it("should return a list of gifs when handleTerm is called", async () => {
    const getGifsByQuerySpy = vi
      .spyOn(gifsAction, "getGifsByQuery")
      .mockResolvedValueOnce(mockGifs);

    const query = "goku";

    const { result } = renderUseGifs();

    await act(async () => {
      await result.current.handleTerm(query);
    });

    expect(result.current.gifs).toHaveLength(mockGifs.length);
    expect(getGifsByQuerySpy).toHaveBeenCalledWith(query);
  });

  it("should return a list of gifs from cache", async () => {
    const query = "goku";

    const { result } = renderUseGifs();

    await act(async () => {
      await result.current.handleTerm(query);
    });

    vi.spyOn(gifsAction, "getGifsByQuery").mockRejectedValue(new Error("lml"));

    await act(async () => {
      await result.current.handleTerm(query);
    });

    expect(result.current.gifs).toHaveLength(10);
  });

  // it("should return a list of gifs from cache", async () => {
  //   const getGifsByQuerySpy = vi
  //     .spyOn(gifsAction, "getGifsByQuery")
  //     .mockResolvedValueOnce(mockGifs);

  //   const query = "goku";

  //   const { result } = renderUseGifs();

  //   await act(async () => {
  //     await result.current.handleTerm(query);
  //   });

  //   getGifsByQuerySpy.mockClear();

  //   await act(async () => {
  //     await result.current.handleTerm(query);
  //   });

  //   expect(getGifsByQuerySpy).not.toHaveBeenCalledWith(query);
  //   expect(result.current.gifs).toHaveLength(mockGifs.length);
  // });

  it("should return no more than 8 previous term", async () => {
    const { result } = renderUseGifs();

    vi.spyOn(gifsAction, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("naruto1");
      await result.current.handleSearch("naruto2");
      await result.current.handleSearch("naruto3");
      await result.current.handleSearch("naruto4");
      await result.current.handleSearch("naruto5");
      await result.current.handleSearch("naruto6");
      await result.current.handleSearch("naruto7");
      await result.current.handleSearch("naruto8");
      await result.current.handleSearch("naruto9");
    });

    expect(result.current.previousTerms.length).toBe(8);

    expect(result.current.previousTerms).toEqual([
      "naruto9",
      "naruto8",
      "naruto7",
      "naruto6",
      "naruto5",
      "naruto4",
      "naruto3",
      "naruto2",
    ]);
  });
});
