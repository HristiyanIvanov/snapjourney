import { useQuery } from "@tanstack/react-query";
import { getCommentsOnPost } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useGetComments(postId) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsOnPost(postId),
    enabled: !!postId,
    onError: (error) => {
      toast.error("Error fetching comments:", error.message);
    },
  });

  return { comments, isLoading, error };
}
