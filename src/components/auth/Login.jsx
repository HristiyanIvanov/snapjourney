import { useState } from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-light">Log in</h1>
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

      <div label="Password">
        <h1 className="text-base font-light">Password</h1>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-80 rounded-lg border border-gray-200 p-2 outline-teal-400"
        />
      </div>
      <button
        onClick={() => navigate("/forgot-password")}
        className="text-right"
      >
        Forgot password?
      </button>
      <div className="flex flex-row items-center justify-between">
        <Button type="submit">
          {!isLoading ? "Log in" : <div className="loader" />}
        </Button>
        <Button color="orange" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </div>
    </form>
  );
}

export default Login;
