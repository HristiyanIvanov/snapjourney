import { useState } from "react";
import { useResetPassword } from "./useResetPassword";
import { toast } from "react-hot-toast";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPwd, isLoading } = useResetPassword();

  function handleResetPassword(e) {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPwd(newPassword);
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
      onSubmit={handleResetPassword}
    >
      <h1 className="text-2xl font-light">Reset Password</h1>
      <div label="New Password">
        <h1 className="text-base font-light">New Password</h1>
        <input
          type="password"
          id="newPassword"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <div label="Confirm Password">
        <h1 className="text-base font-light">Confirm Password</h1>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <button
        type="submit"
        className="w-28 rounded-lg bg-teal-500 p-2 text-white hover:bg-teal-600"
        disabled={isLoading}
      >
        {isLoading ? <div className="loader" /> : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPassword;
