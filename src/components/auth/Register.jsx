import { useState } from "react";
import { useSignup } from "./useSignup";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { signup, isLoading } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !fullName) return;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    signup(
      { email, password, fullName },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setFullName("");
        },
      },
    );
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-light">Register new account</h1>
      <div label="Full Name">
        <h1 className="text-base font-light">Full Name</h1>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <div label="Email address">
        <h1 className="text-base font-light">Email address</h1>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>

      <div label="Password">
        <h1 className="text-base font-light">Password</h1>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <div label="Confirm Password">
        <h1 className="text-base font-light">Confirm Password</h1>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <button
          className="w-28 rounded-lg border border-orange-500 bg-orange-300 p-2 transition-all duration-300 hover:bg-orange-400"
          type="submit"
        >
          {!isLoading ? "Sign up" : <div className="loader" />}
        </button>
      </div>
    </form>
  );
}

export default Register;
