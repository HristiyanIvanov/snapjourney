import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
function ImageModal({
  isImageModalOpen,
  closeImageModal,
  image,
  setImage,
  setFile,
}) {
  const [dragActive, setDragActive] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleImageUpload = (file) => {
    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setImage(null);
    document.getElementById("fileInput").value = "";
  };
  return (
    <Modal
      isVisible={isImageModalOpen}
      onClose={closeImageModal}
      title="Upload Image"
    >
      <div className="py-6 md:w-96">
        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors ${dragActive ? "border-teal-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {image ? (
            <img src={image} alt="Uploaded" className="max-h-48" />
          ) : (
            <div>
              <p className="text-gray-500">
                Drag & Drop an image or click to upload
              </p>
              <p className="text-sm text-gray-400">
                Only image files are supported
              </p>
            </div>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex flex-row justify-end gap-2">
        <Button color="red" onClick={clearImage}>
          Clear
        </Button>
        <Button onClick={closeImageModal}>Upload</Button>
      </div>
    </Modal>
  );
}

export default ImageModal;
