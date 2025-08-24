import { useEffect, useState, type KeyboardEventHandler } from "react";

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Buscar" }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onSearch]);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDowm: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDowm}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
