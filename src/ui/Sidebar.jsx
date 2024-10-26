import { GoBell, GoGear, GoHome, GoPerson } from "react-icons/go";
import SideBarItem from "./SideBarItem";
import { Link } from "react-router-dom";
import Logout from "../components/auth/Logout";

function Sidebar() {
  return (
    <div className="flex min-h-screen max-w-72 flex-col gap-5 border-r border-gray-300 p-5 text-gray-600">
      <Link to="/">
        <img
          className="p-auto m-auto size-10 opacity-80 sm:size-20 md:size-32 lg:size-40"
          src="logo_blacktext.png"
          alt="Logo"
        />
      </Link>
      <Link to="/">
        <SideBarItem icon={<GoHome />} title="Home" />
      </Link>
      <Link to="/profile">
        <SideBarItem icon={<GoPerson />} title="My Profile" />
      </Link>
      <Link to="/notifications">
        <SideBarItem icon={<GoBell />} title="Notifications" />
      </Link>
      <Link to="/settings">
        <SideBarItem icon={<GoGear />} title="Settings" />
      </Link>
      <Logout />
    </div>
  );
}

export default Sidebar;
