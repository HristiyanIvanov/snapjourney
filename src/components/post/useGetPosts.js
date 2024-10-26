import { getPosts } from "../../services/apiPosts";
import { useQuery } from "@tanstack/react-query";

export function useGetPosts() {
  const {
    isLoading,
    data: posts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  return { isLoading, posts, error, refetch };
}
