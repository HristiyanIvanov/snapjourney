import { useQuery } from "@tanstack/react-query";
import {
  getInteractionByUserOnPost,
  getInteractions,
} from "../../services/apiIntercations";

export function useGetInteractions() {
  const {
    data: interactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["interactions"],
    queryFn: getInteractions,
  });

  return { interactions, isLoading, error };
}

export function useGetInteractionsByUserOnPost(userId, postId) {
  const {
    data: interactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["interactions", userId, postId],
    queryFn: () => getInteractionByUserOnPost(userId, postId),
  });

  return { interactions, isLoading, error };
}
