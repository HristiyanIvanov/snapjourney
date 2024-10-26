import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../services/uploadImages";
import toast from "react-hot-toast";

export const useUploadImage = (user, description, address, makeNewPost) => {
  return useMutation({
    mutationFn: async (image) => {
      const imageUrl = await uploadImage(image);
      return imageUrl;
    },
    onSuccess: (imageUrl) => {
      const postData = {
        user_id: user.id,
        description,
        photo_url: imageUrl,
        location: address,
      };
      makeNewPost(postData);
    },
    onError: (error) => {
      toast.error(`Image upload failed: ${error.message}`);
    },
  });
};
