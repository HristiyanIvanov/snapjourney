import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/auth/useUser";
import { useGetUsers } from "../components/profile/useGetUsers";
import {
  useChangePassword,
  useDeleteAccount,
  useEditAvatar,
  useEditBio,
  useEditNames,
  useEditUsername,
} from "../components/profile/useEditProfile";
import { useDarkMode } from "../components/useDarkMode";
import { uploadAvatar } from "../services/uploadImages";
import Settings from "../ui/Settings";

const SettingsPage = () => {
  const { user } = useUser();
  const { users } = useGetUsers();
  const { editAvatar } = useEditAvatar();
  const { editBio } = useEditBio();
  const { editNames } = useEditNames();
  const { editUsername } = useEditUsername();
  const { changePassword } = useChangePassword();
  const { deleteAccount } = useDeleteAccount();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const currentUser = users?.data?.find((u) => u.id === user?.id);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingProfileEdit, setIsLoadingProfileEdit] = useState(false);
  const [isLoadingUserEdit, setIsLoadingUserEdit] = useState(false);

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
    setIsLoadingProfileEdit(true);
    const updates = [];
    const oldAvatarId = currentUser.avatar_url.split("/").pop().split("-")[1];
    const oldAvatarUrl = currentUser.avatar_url;

    if (avatarFile) {
      const { fullPath } = await uploadAvatar(
        avatarFile,
        oldAvatarId,
        oldAvatarUrl,
      );
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

    setIsLoadingProfileEdit(false);
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoadingUserEdit(true);
    changePassword(newPassword);
    setIsLoadingUserEdit(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      setIsLoadingUserEdit(true);
      deleteAccount();
      setIsLoadingUserEdit(false);
      navigate("/login");
    }
  };

  return (
    <Settings
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      isLoading={isLoadingProfileEdit}
      isLoadingUserEdit={isLoadingUserEdit}
      handleChangePassword={handleChangePassword}
      handleDeleteAccount={handleDeleteAccount}
      fullName={fullName}
      setFullName={setFullName}
      username={username}
      setUsername={setUsername}
      bio={bio}
      setBio={setBio}
      avatarUrl={avatarUrl}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SettingsPage;
