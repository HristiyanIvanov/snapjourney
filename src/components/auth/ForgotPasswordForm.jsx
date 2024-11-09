import { useState } from "react";
import Button from "../../ui/Button";
import { useForgotPassword } from "./useForgotPassword";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useForgotPassword();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    forgotPassword(email);
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-light">Forgot Password</h1>
      <div label="Email address">
        <h1 className="text-base font-light">Email address</h1>
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:outline-gray-600"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button color="teal" type="submit">
          {!isLoading ? "Send Email" : <div className="loader" />}
        </Button>
        <Button color="gray" type="button" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </form>
  );
}

export default ForgotPassword;
