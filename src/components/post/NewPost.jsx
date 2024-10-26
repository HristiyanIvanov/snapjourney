import AddPost from "../../ui/AddPost";
import { useState } from "react";
import toast from "react-hot-toast";
import useLoadGoogleMaps from "../../services/apiGoogle";
import ImageModal from "./ImageModal";
import LocationModal from "./LocationModal";
import { useUser } from "../auth/useUser";
import { useCreatePost } from "./useCreatePost";
import { uploadImage } from "../../services/uploadImages";
import { useMutation } from "@tanstack/react-query";
import { useGetPosts } from "./useGetPosts";
function NewPost({ refetchPosts }) {
  const { user, isLoading: userLoading } = useUser();
  const { makeNewPost, isLoading } = useCreatePost();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const { data: google, error } = useLoadGoogleMaps();
  const mutation = useMutation({
    mutationFn: async (image) => {
      const imageUrl = await uploadImage(image);
      setImage(imageUrl);
      return imageUrl;
    },
    onSuccess: () => {
      const postData = {
        user_id: user.id,
        description,
        photo_url: image,
        location: address,
      };
      makeNewPost(postData);
    },
    onError: (error) => {
      toast.error(`Image upload failed: ${error.message}`);
    },
  });
  const closeImageModal = () => setIsImageModalOpen(false);
  const closeLocationModal = () => setIsLocationModalOpen(false);
  const openImageModal = (e) => {
    e.preventDefault();
    setIsImageModalOpen(true);
  };
  const openLocationModal = (e) => {
    e.preventDefault();
    setIsLocationModalOpen(true);
  };

  const createPost = (e) => {
    e.preventDefault();
    if (userLoading || !user) {
      toast.error("User is not authenticated");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (!address) {
      toast.error("Please enter a location");
      return;
    }

    if (!description) {
      toast.error("Please enter a description");
      return;
    }

    mutation.mutate(image, {
      onSuccess: () => {
        refetchPosts();
        setImage(null);
        setDescription("");
        setAddress("");
      },
    });
  };

  if (error) return toast.error(error.message);

  return (
    <div className="flex flex-col items-center gap-4">
      <AddPost
        openImageModal={openImageModal}
        openLocationModal={openLocationModal}
        setDescription={setDescription}
        createPost={createPost}
        isLoading={isLoading}
      />
      <ImageModal
        isImageModalOpen={isImageModalOpen}
        closeImageModal={closeImageModal}
        image={image}
        setImage={setImage}
      />
      <LocationModal
        isLocationModalOpen={isLocationModalOpen}
        closeLocationModal={closeLocationModal}
        address={address}
        setAddress={setAddress}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        google={google}
      />
    </div>
  );
}

export default NewPost;
