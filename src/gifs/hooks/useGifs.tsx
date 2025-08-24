import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interface/gif";

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTerm = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    const lowerCaseQuery = trimmedQuery.toLowerCase();
    const isDuplicated = previousTerms.includes(lowerCaseQuery);

    if (trimmedQuery.length === 0) return;
    if (isDuplicated) return;
    setPreviousTerms((prevTerms) => [
      lowerCaseQuery,
      ...prevTerms.splice(0, 8),
    ]);

    const gifs = await getGifsByQuery(lowerCaseQuery);
    setGifs(gifs);
  };

  return { gifs, handleTerm, handleSearch, previousTerms };
};
