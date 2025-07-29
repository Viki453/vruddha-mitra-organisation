import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineSun,
} from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import DarkModeToggle from "./DarkModeToggle";

function Header({ className }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  console.log(user);
  return (
    <div
      className={` flex content-center justify-end text-3xl gap-3 p-3 ${className} header `}
    >
      <img
        className=" rounded-full h-[1em] w-[1em] bg-accent"
        src={
          !user.user_metadata.avatar
            ? "/public/default-user.png"
            : user.user_metadata.avatar
        }
      />
      <span
        className="text-xl cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        Hello, {user?.user_metadata?.firstName}
      </span>
      <DarkModeToggle />
      <button disabled={isLoading} onClick={logout}>
        <HiOutlineArrowLeftStartOnRectangle />
      </button>
    </div>
  );
}

export default Header;
