import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createInteraction,
  deleteInteraction,
} from "../../services/apiIntercations";

export function useCreateInteraction() {
  const { mutate: createNewInteraction, isLoading } = useMutation({
    mutationFn: createInteraction,
    onError: (error) => {
      toast.error(error.message || "Failed to like post");
    },
  });
  return { createNewInteraction, isLoading };
}

export function useDeleteInteraction() {
  const { mutate: deleteExistingInteraction, isLoading } = useMutation({
    mutationFn: (id) => deleteInteraction(id),
    onError: (error) => {
      toast.error(error.message || "Failed to unlike post");
    },
  });
  return { deleteExistingInteraction, isLoading };
}
