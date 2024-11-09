import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useSearchUsers(query) {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 3,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch users");
    },
  });

  return { users, isLoading, error };
}
