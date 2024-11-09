import { GoBell, GoGear, GoHome, GoPerson } from "react-icons/go";
import SideBarItem from "./SideBarItem";
import { Link, useLocation } from "react-router-dom";
import Logout from "../components/auth/Logout";
import { useGetUsers } from "../components/profile/useGetUsers";
import { useUser } from "../components/auth/useUser";
import { useDarkMode } from "../components/useDarkMode";

function Sidebar({ toggleNotifications, isNotificationsOpen }) {
  const location = useLocation();
  const { users } = useGetUsers();
  const { user } = useUser();
  const currentUser = users?.data?.find((u) => u.id === user?.id);
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex min-h-screen max-w-72 flex-col gap-5 border-r border-gray-300 p-5 text-gray-600 dark:border-gray-600 dark:text-gray-300">
      <Link to="/">
        <img
          className="p-auto m-auto size-10 opacity-80 sm:size-20 md:size-32 lg:size-40"
          src={
            isDarkMode
              ? "../../../logo_whitetext.png"
              : "../../../logo_blacktext.png"
          }
          alt="Logo"
        />
      </Link>
      <Link to="/">
        <SideBarItem
          icon={<GoHome />}
          title="Home"
          isActive={location.pathname === "/"}
        />
      </Link>
      <Link to={`/profile/${currentUser?.username}`}>
        <SideBarItem
          icon={<GoPerson />}
          title="My Profile"
          isActive={location.pathname === `/profile/${currentUser?.username}`}
        />
      </Link>
      <button onClick={toggleNotifications}>
        <SideBarItem
          icon={<GoBell />}
          title="Notifications"
          isActive={isNotificationsOpen}
        />
      </button>
      <Link to="/settings">
        <SideBarItem
          icon={<GoGear />}
          title="Settings"
          isActive={location.pathname === "/settings"}
        />
      </Link>
      <Logout isMobile={false} />
    </div>
  );
}

export default Sidebar;
