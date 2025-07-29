import { Children } from "react";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";

function Menu({ children }) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-transparent text-2xl"
      >
        <HiOutlineEllipsisHorizontal />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-1 w-52 p-2 shadow-sm"
      >
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
