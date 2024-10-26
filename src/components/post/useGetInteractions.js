import { useQuery } from "@tanstack/react-query";
import { getInteractions } from "../../services/apiIntercations";

export function useGetInteractions() {
  const {
    isLoading,
    data: interactions,
    error,
  } = useQuery({
    queryKey: ["interactions"],
    queryFn: () => getInteractions(),
  });
  return { isLoading, interactions, error };
}