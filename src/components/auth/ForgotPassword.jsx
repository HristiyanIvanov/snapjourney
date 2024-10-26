import { useState } from "react";
import Button from "../../ui/Button";
import { useForgotPassword } from "./useForgotPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    forgotPassword(email);
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
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
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button type="submit">
          {!isLoading ? "Send Reset Email" : <div className="loader" />}
        </Button>
      </div>
    </form>
  );
}

export default ForgotPassword;
