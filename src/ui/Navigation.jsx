import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { NavLink } from "react-router";

function Navigation() {
  return (
    <ul className="flex flex-col gap-2 text-2xl font-medium w-auto">
      <li>
        <NavLink to="dashboard" className="navlink">
          <span>
            <HiOutlineHome />
          </span>

          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="bookings" className="navlink">
          <span>
            <HiOutlineCalendarDays />
          </span>
          <span>Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="vruddhas" className="navlink">
          <span>
            <HiOutlineUserGroup />
          </span>
          <span>Vruddhas</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="users" className="navlink">
          <span>
            <HiOutlineIdentification />
          </span>
          <span>Users</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
