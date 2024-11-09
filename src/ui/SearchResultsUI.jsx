import Button from "./Button";

function SearchResultsUI({ query, isLoading, users, handleUserClick, goBack }) {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Search Results</h1>
        <Button color="gray" onClick={goBack}>
          Go Back
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : users?.length ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.username)}
              className="flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <img
                src={user.avatar_url}
                alt={user.username}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {user.full_name}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found matching &quot;{query}&quot;</p>
      )}
    </div>
  );
}

export default SearchResultsUI;
