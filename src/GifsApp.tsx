import { useState } from "react";
import { PreviousSearches } from "./gifs/components/PreviousSearchers";
import { GifList } from "./gifs/components/GifList";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interface/gif";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState([
    "Dragon Ball Z",
    "Naruto Shippuden",
  ]);

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

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* search */}
      {/* SearchBar */}
      <SearchBar onSearch={handleSearch} placeholder="Buscar gifs" />

      {/* Busquedas previas */}
      {/* PreviousSearches */}
      <PreviousSearches searches={previousTerms} onLabelClick={handleTerm} />

      {/* Gifs */}
      {/* GifList */}
      <GifList gifs={gifs} />
    </>
  );
};
