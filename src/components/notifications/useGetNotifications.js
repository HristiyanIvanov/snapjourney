import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getNotifications } from "../../services/apiNotifications";

export function useGetNotifications() {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),

    onError: (error) => {
      toast.error("Error fetching notifications:", error.message);
    },
  });

  return { notifications, isLoading, error };
}
