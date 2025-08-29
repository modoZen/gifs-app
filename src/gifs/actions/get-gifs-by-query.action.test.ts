import { beforeEach, describe, expect, it, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import { giphyApi } from "../api/giphy.api";
import { giphyResponseMock } from "../mock/giphy.response.mock";
import AxiosMockAdapter from "axios-mock-adapter";

describe("getGifsByQuery tests", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });

  // it("should return a list of gifs", async () => {
  //   const [gif1] = await getGifsByQuery("goku");

  //   expect(gif1).toEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     height: expect.any(Number),
  //     width: expect.any(Number),
  //     url: expect.any(String),
  //   });
  // });

  it("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphyResponseMock);

    const gifs = await getGifsByQuery("goku");

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
    });
  });

  it("should return empty list when query is empty", async () => {
    const gifs = await getGifsByQuery("");

    expect(gifs).toHaveLength(0);
  });

  it("should handle error when the API returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad Request",
      },
    });

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
