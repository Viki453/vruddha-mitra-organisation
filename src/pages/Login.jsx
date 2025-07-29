import { useDarkMode } from "../contexts/DarkModeContext";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      data-theme={isDarkMode ? "sunset-dark" : "sunset-light"}
    >
      <LoginForm />
    </div>
  );
}

export default Login;
