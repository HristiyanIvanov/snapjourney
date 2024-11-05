import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import {
  useEditAvatar,
  useEditBio,
  useEditNames,
  useEditUsername,
} from "./useEditProfile";
import { useUser } from "../auth/useUser";
import { useGetUsers } from "./useGetUsers";
import { uploadAvatar } from "../../services/uploadImages";
import toast from "react-hot-toast";

function EditProfileModal({ isVisible, onClose }) {
  const { user } = useUser();
  const { users } = useGetUsers();
  const { editAvatar } = useEditAvatar();
  const { editBio } = useEditBio();
  const { editNames } = useEditNames();
  const { editUsername } = useEditUsername();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = users.data?.find((u) => u.id === user?.id);
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.full_name);
      setUsername(currentUser.username);
      setBio(currentUser.bio);
      setAvatarUrl(currentUser.avatar_url);
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAvatarUrl(fileURL);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updates = [];
    const oldAvatarId = currentUser.avatar_url.split("/").pop().split("-")[1];
    if (avatarFile) {
      const { fullPath } = await uploadAvatar(avatarFile, oldAvatarId);
      updates.push(
        editAvatar({
          id: user.id,
          avatar_url: import.meta.env.VITE_SUPABASE_BUCKET_URL + fullPath,
        }),
      );
    }

    if (bio !== currentUser.bio) {
      updates.push(editBio({ id: user.id, bio }));
    }

    if (fullName !== currentUser.full_name) {
      updates.push(editNames({ id: user.id, full_name: fullName }));
    }

    if (username !== currentUser.username) {
      updates.push(editUsername({ id: user.id, username }));
    }

    await Promise.all(updates);

    setLoading(false);
    toast.success("Profile updated successfully");
    onClose();
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center gap-2">
          {avatarUrl ? (
            <label className="relative cursor-pointer">
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="h-30 w-30 mb-2 rounded-full object-cover"
                style={{ width: "7.5rem", height: "7.5rem" }}
              />
              <span className="absolute bottom-2 left-0 right-0 rounded-full bg-black bg-opacity-30 p-9 text-center font-light text-white">
                Change Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2"
            />
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 outline-teal-400"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 outline-teal-400"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 outline-teal-400"
          />
        </div>
        <Button color="teal" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Modal>
  );
}

export default EditProfileModal;
