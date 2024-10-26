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
  });
  return { isLoading, users, error };
}