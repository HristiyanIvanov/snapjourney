import { getPosts } from "../../services/apiPosts";
import { useQuery } from "@tanstack/react-query";

export function useGetPosts(page = 1, limit = 10) {
  const {
    isLoading,
    data: posts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page, limit),
    keepPreviousData: true,
  });

  return { isLoading, posts, error, refetch };
}
