import AddPost from "../../ui/AddPost";
import { useState } from "react";
import toast from "react-hot-toast";
import useLoadGoogleMaps from "../../services/apiGoogle";
import ImageModal from "./ImageModal";
import LocationModal from "./LocationModal";

function NewPost() {
  const [image, setImage] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const { data: google, error } = useLoadGoogleMaps();
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
  };

  if (error) return toast.error(error.message);

  return (
    <div className="flex flex-col items-center gap-4">
      <AddPost
        openImageModal={openImageModal}
        openLocationModal={openLocationModal}
        createPost={createPost}
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
