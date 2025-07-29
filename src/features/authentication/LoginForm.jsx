import { useState } from "react";
import Logo from "../../ui/Logo.jsx";
import { login } from "../../services/apiAuth";
import useLogin from "./useLogin.js";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-xs px-4">
        <Logo />
        <div className="text-3xl font-semibold">Welcome, User</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="email">Email Id</label>
            <input
              id="email"
              type="email"
              placeholder="Email-id"
              className="input input-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col justify-center">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input input-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-accent mt-2"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
