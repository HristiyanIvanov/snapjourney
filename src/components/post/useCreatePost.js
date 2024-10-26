import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPost } from "../../services/apiPosts";

export function useCreatePost() {
  const { mutate: makeNewPost, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });
  return { makeNewPost, isLoading };
}
