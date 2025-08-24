import { giphyApi } from "../api/giphy.api";
import type { GiphyResponse } from "../interface/giphy.response";
import type { Gif } from "../interface/gif";

export const getGifsByQuery = async (
  query: string,
  limit: number = 10
): Promise<Gif[]> => {
  const response = await giphyApi.get<GiphyResponse>("/search", {
    params: {
      q: query,
      limit,
    },
  });

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
