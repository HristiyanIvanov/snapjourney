import { GoBell, GoGear, GoHome, GoPerson } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import Logout from "../components/auth/Logout";

function MobileNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-lg md:hidden">
      <div className="flex justify-around py-3">
        <Link to="/">
          <div
            className={`flex flex-col items-center ${isActive("/") ? "text-teal-500" : "text-gray-600"}`}
          >
            <GoHome className="text-2xl" />
            <span className="text-xs text-gray-500">Home</span>
          </div>
        </Link>
        <Link to="/profile">
          <div className="flex flex-col items-center">
            <GoPerson className="text-2xl text-gray-600" />
            <span className="text-xs text-gray-500">Profile</span>
          </div>
        </Link>
        <Link to="/notifications">
          <div className="flex flex-col items-center">
            <GoBell className="text-2xl text-gray-600" />
            <span className="text-xs text-gray-500">Notifications</span>
          </div>
        </Link>
        <Link to="/settings">
          <div className="flex flex-col items-center">
            <GoGear className="text-2xl text-gray-600" />
            <span className="text-xs text-gray-500">Settings</span>
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
