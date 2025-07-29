import Navigation from "./Navigation";
import Logo from "./Logo";

function SideBar({ className }) {
  return (
    <div
      className={`${className} flex justify-start flex-col items-center gap-14 p-1 `}
    >
      <div className="flex-[1fr] ">
        <Logo />
      </div>
      <div className="flex-auto h-full">
        <Navigation />
      </div>
    </div>
  );
}

export default SideBar;
