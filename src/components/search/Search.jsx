import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../ui/SearchBox";
import { useSearchUsers } from "./useSearchUsers";
function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const { users, isLoading } = useSearchUsers(query);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
    setQuery("");
  };

  const handleViewAll = () => {
    navigate(`/search-results?query=${query}`);
  };

  return (
    <SearchBox
      query={query}
      users={users}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      onClear={handleClear}
      onUserClick={handleUserClick}
      onViewAll={handleViewAll}
    />
  );
}

export default Search;
