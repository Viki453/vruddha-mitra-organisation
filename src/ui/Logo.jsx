import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/Logo-dark.png" : "/Logo-light.png";
  return (
    <img
      src={src}
      className="rounded-[100%] h-[175px] mt-7 border-accent border-2"
    />
  );
}

export default Logo;
