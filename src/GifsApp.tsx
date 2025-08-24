import { PreviousSearches } from "./gifs/components/PreviousSearchers";
import { GifList } from "./gifs/components/GifList";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, previousTerms, handleSearch, handleTerm } = useGifs();

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
