import toast from "react-hot-toast";
import { getUsers } from "../../services/apiUsers";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),

    onError: (error) => {
      toast.error("Error fetching users:", error.message);
    },
  });
  return { isLoading, users, error };
}
