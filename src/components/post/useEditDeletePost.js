import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePost, updatePost } from "../../services/apiPosts";
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deleteExistingPost, isLoading } = useMutation({
    mutationFn: (deleteId) => deletePost(deleteId),
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { deleteExistingPost, isLoading };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { mutate: updateExistingPost, isLoading } = useMutation({
    mutationFn: ({ id, obj }) => updatePost(id, obj),
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { updateExistingPost, isLoading };
}
