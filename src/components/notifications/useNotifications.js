import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createNotification,
  deleteNotification,
  updateNotification,
} from "../../services/apiNotifications";

export function useCreateNotification() {
  const queryClient = useQueryClient();

  const { mutate: createNewNotification, isLoading } = useMutation({
    mutationFn: (data) => createNotification(data),
    onError: (error) => {
      toast.error(error.message || "Failed to create notification");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return { createNewNotification, isLoading };
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const { mutate: deleteExistingNotification, isLoading } = useMutation({
    mutationFn: (deleteId) => deleteNotification(deleteId),
    onError: (error) => {
      toast.error(error.message || "Failed to delete notification");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return { deleteExistingNotification, isLoading };
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  const { mutate: updateExistingNotification, isLoading } = useMutation({
    mutationFn: (data) => updateNotification(data),
    onError: (error) => {
      toast.error(error.message || "Failed to update notification");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return { updateExistingNotification, isLoading };
}
