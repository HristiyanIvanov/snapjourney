import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFollower, deleteFollower } from "../../services/apiFollowers";
import toast from "react-hot-toast";

export function useFollowUser() {
  const queryClient = useQueryClient();

  const { mutate: followUser, isLoading } = useMutation({
    mutationFn: createFollower,
    onError: (error) => {
      toast.error(error.message || "Failed to follow user");
    },
    onSuccess: () => {
      toast.success("Successfully followed user");
      queryClient.invalidateQueries(["followers"]);
    },
  });

  return { followUser, isLoading };
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  const { mutate: unfollowUser, isLoading } = useMutation({
    mutationFn: (followed_id) => deleteFollower(followed_id),
    onError: (error) => {
      toast.error(error.message || "Failed to unfollow user");
    },
    onSuccess: () => {
      toast.success("Successfully unfollowed user");
      queryClient.invalidateQueries(["followers"]);
    },
  });

  return { unfollowUser, isLoading };
}
