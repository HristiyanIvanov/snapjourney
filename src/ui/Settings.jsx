import { GoCheck } from "react-icons/go";
import Button from "./Button";

const Settings = ({
  isDarkMode,
  toggleDarkMode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  isLoadingUserEdit,
  handleChangePassword,
  handleDeleteAccount,
  fullName,
  setFullName,
  username,
  setUsername,
  bio,
  setBio,
  avatarUrl,
  handleFileChange,
  handleSubmit,
}) => {
  return (
    <div className="mx-auto max-w-[70%] space-y-6 rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
      <h2 className="text-center text-2xl font-semibold">Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center gap-2">
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
            className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
        <Button color="teal" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <div className="flex flex-row items-center justify-between">
          <Button
            onClick={handleChangePassword}
            disabled={isLoadingUserEdit}
            color="teal"
          >
            {isLoadingUserEdit ? "Changing..." : "Change Password"}
          </Button>
          <div className="text-center">
            <Button
              onClick={handleDeleteAccount}
              color="red"
              disabled={isLoadingUserEdit}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-lg">Dark Mode</label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          id="checkbox"
          className="peer hidden"
        />
        <label
          htmlFor="checkbox"
          className="flex h-7 w-7 cursor-pointer items-center rounded-lg border border-gray-400 bg-gray-300 transition-colors peer-checked:bg-teal-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-teal-400"
        >
          <GoCheck className="mx-auto text-xl text-black" />
        </label>
      </div>
    </div>
  );
};

export default Settings;
