import { useState } from "react";

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const incrementPage = () => setPage((prevPage) => prevPage + 1);
  const resetPagination = () => setPage(initialPage);

  return {
    page,
    setPage,
    hasMore,
    setHasMore,
    loadingMore,
    setLoadingMore,
    incrementPage,
    resetPagination,
  };
}
