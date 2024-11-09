import { GoSearch, GoX } from "react-icons/go";

function SearchBox({
  query,
  users,
  isLoading,
  onInputChange,
  onClear,
  onUserClick,
  onViewAll,
}) {
  return (
    <div className="relative mx-auto size-4/5">
      <div className="flex items-center rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus-within:border-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50">
        <GoSearch className="ml-2 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={onInputChange}
          placeholder="Search by name or username..."
          className="flex-grow bg-transparent px-2 py-1 font-light text-gray-700 placeholder-gray-400 outline-none dark:text-gray-300"
        />
        {query && (
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-red-400"
          >
            <GoX />
          </button>
        )}
      </div>

      {query.length >= 3 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {isLoading ? (
            <p className="p-2 text-gray-500">Loading...</p>
          ) : users?.length ? (
            <>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => onUserClick(user.username)}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex flex-col pl-2">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {user.full_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{user.username}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={onViewAll}
                className="w-full py-2 text-center text-teal-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View All Results
              </button>
            </>
          ) : (
            <p className="p-2 text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
