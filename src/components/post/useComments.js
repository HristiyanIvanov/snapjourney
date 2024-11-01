import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/apiComments";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createNewComment, isLoading } = useMutation({
    mutationFn: createComment,
    onError: (error) => {
      toast.error(error.message || "Failed to create comment");
    },
    onSuccess: () => {
      toast.success("Successfully posted comment");
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return { createNewComment, isLoading };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate: deleteExistingComment, isLoading } = useMutation({
    mutationFn: (deleteId) => deleteComment(deleteId),
    onError: (error) => {
      toast.error(error.message || "Failed to delete comment");
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return { deleteExistingComment, isLoading };
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const { mutate: updateExistingComment, isLoading } = useMutation({
    mutationFn: ({ id, comment }) => {
      return updateComment(id, { comment });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update comment");
    },
    onSuccess: () => {
      toast.success("Comment edited successfully");
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return { updateExistingComment, isLoading };
};
