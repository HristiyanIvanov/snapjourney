import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useEditAvatar() {
  const queryClient = useQueryClient();

  const { mutate: editAvatar, isLoading } = useMutation({
    mutationFn: ({ id, avatar_url }) => {
      return updateUser(id, { avatar_url });
    },
    onError: (error) => {
      toast.error("Error updating avatar:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { editAvatar, isLoading };
}

export function useEditBio() {
  const queryClient = useQueryClient();

  const { mutate: editBio, isLoading } = useMutation({
    mutationFn: ({ id, bio }) => {
      return updateUser(id, { bio });
    },
    onError: (error) => {
      toast.error("Error updating bio:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { editBio, isLoading };
}

export function useEditNames() {
  const queryClient = useQueryClient();

  const { mutate: editNames, isLoading } = useMutation({
    mutationFn: ({ id, full_name }) => {
      return updateUser(id, { full_name });
    },
    onError: (error) => {
      toast.error("Error updating names:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { editNames, isLoading };
}

export function useEditUsername() {
  const queryClient = useQueryClient();

  const { mutate: editUsername, isLoading } = useMutation({
    mutationFn: ({ id, username }) => {
      return updateUser(id, { username });
    },
    onError: (error) => {
      toast.error("Error updating username:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { editUsername, isLoading };
}
