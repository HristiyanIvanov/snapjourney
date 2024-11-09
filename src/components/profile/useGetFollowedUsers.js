import { useQuery } from "@tanstack/react-query";
import { getFollowedUsers } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useGetFollowedUsers(currentUserId) {
  const {
    isLoading,
    data: followedUsers,
    error,
  } = useQuery({
    queryKey: ["followedUsers", currentUserId],
    queryFn: () => getFollowedUsers(currentUserId),
    enabled: !!currentUserId,
    onError: (error) => {
      toast.error("Error fetching followed users:", error.message);
    },
  });
  return { isLoading, followedUsers, error };
}
