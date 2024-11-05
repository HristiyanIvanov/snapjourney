import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/apiFollowers";

export function useGetFollowers() {
  const {
    isLoading,
    data: followers,
    error,
  } = useQuery({
    queryKey: ["followers"],
    queryFn: () => getFollowers(),
  });
  return { isLoading, followers, error };
}
