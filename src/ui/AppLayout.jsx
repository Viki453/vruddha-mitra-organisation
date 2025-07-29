import { Outlet } from "react-router";
import SideBar from "./SideBar";
import Header from "./Header";
import { useDarkMode } from "../contexts/DarkModeContext";

function AppLayout() {
  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr] grid-rows-[50px_1fr] h-screen layout overflow-hidden transition-colors duration-300 ">
      <SideBar className="row-span-2" />
      <Header className="col-start-2 row-start-1 col-span-full  bg-base-300" />
      <main className="col-start-2 row-start-2 col-span-full  p-10 bg-base-200 overflow-auto">
        <div className="flex flex-col justify-center content-center mx-10 my-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
