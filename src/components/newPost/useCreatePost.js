import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPost } from "../../services/apiPosts";

export function useCreatePost() {
  const { mutate: makeNewPost, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data, variables, context) => {
      toast.dismiss();
      toast.success("Post created successfully!");
      if (context?.onSuccess) context.onSuccess();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || "Failed to create post");
    },
  });
  return { makeNewPost, isLoading };
}
