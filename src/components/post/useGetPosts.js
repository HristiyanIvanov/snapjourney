import toast from "react-hot-toast";
import { getPost, getPosts } from "../../services/apiPosts";
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
    onError: (error) => {
      toast.error("Error fetching posts:", error.message);
    },
  });

  return { isLoading, posts, error, refetch };
}

export function useGetPostById(postId) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
    onError: (error) => {
      toast.error("Error fetching post:", error.message);
    },
  });

  return { post, isLoading, error };
}
