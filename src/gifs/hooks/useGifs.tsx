import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interface/gif";

const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTerm = async (term: string) => {
    if (gifsCache[term]) {
      setGifs(gifsCache[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    const workedQuery = query.trim().toLowerCase();
    const isDuplicated = previousTerms.includes(workedQuery);

    if (workedQuery.length === 0) return;
    if (isDuplicated) return;
    setPreviousTerms((prevTerms) => [workedQuery, ...prevTerms.splice(0, 8)]);

    const gifs = await getGifsByQuery(workedQuery);
    setGifs(gifs);

    gifsCache[workedQuery] = gifs;

    console.log(gifsCache);
  };

  return { gifs, handleTerm, handleSearch, previousTerms };
};
