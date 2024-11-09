import { useSearchParams } from "react-router-dom";
import { useSearchUsers } from "./useSearchUsers";
import { useNavigate } from "react-router-dom";
import SearchResultsUI from "../../ui/SearchResultsUI";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { users, isLoading } = useSearchUsers(query);
  const navigate = useNavigate();

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="h-screen">
      <SearchResultsUI
        query={query}
        isLoading={isLoading}
        users={users}
        handleUserClick={handleUserClick}
        goBack={() => navigate(-1)}
      />
    </div>
  );
}

export default SearchResults;
