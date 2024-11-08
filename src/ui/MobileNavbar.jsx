import { GoBell, GoGear, GoHome, GoPerson } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import Logout from "../components/auth/Logout";
import { useGetUsers } from "../components/profile/useGetUsers";
import { useUser } from "../components/auth/useUser";

function MobileNavbar({ toggleNotifications, isNotificationsOpen }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { users, isLoading: usersLoading } = useGetUsers();
  const { user, isLoading: userLoading } = useUser();

  const currentUser = users?.data?.find((u) => u.id === user?.id);

  if (usersLoading || userLoading) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-lg md:hidden">
      <div className="flex justify-around py-3">
        <Link to="/">
          <div
            className={`flex flex-col items-center ${isActive("/") ? "text-teal-500" : "text-gray-600"}`}
          >
            <GoHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        {currentUser && (
          <Link to={`/profile/${currentUser.username}`}>
            <div
              className={`flex flex-col items-center ${isActive(`/profile/${currentUser.username}`) ? "text-teal-500" : "text-gray-600"}`}
            >
              <GoPerson className="text-2xl" />
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        )}

        <button onClick={toggleNotifications}>
          <div
            className={`flex flex-col items-center ${isNotificationsOpen ? "text-teal-500" : "text-gray-600"}`}
          >
            <GoBell className="text-2xl" />
            <span className="text-xs">Notifications</span>
          </div>
        </button>

        <Link to="/settings">
          <div
            className={`flex flex-col items-center ${isActive("/settings") ? "text-teal-500" : "text-gray-600"}`}
          >
            <GoGear className="text-2xl" />
            <span className="text-xs">Settings</span>
          </div>
        </Link>

        <div className="flex flex-col items-center">
          <Logout isMobile={true} />
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
