import { GoSignOut } from "react-icons/go";
import SideBarItem from "../../ui/SideBarItem";
import { useLogout } from "./useLogout";

function Logout({ isMobile }) {
  const { logout, isLoading } = useLogout();

  return (
    <button onClick={logout} className="flex w-full items-center">
      {!isLoading ? (
        isMobile ? (
          <div className="flex flex-col items-center">
            <GoSignOut className="text-2xl text-gray-600 dark:text-gray-300" />
            <span className="text-xs text-gray-500 dark:text-gray-300">
              Log out
            </span>
          </div>
        ) : (
          <SideBarItem icon={<GoSignOut />} title="Log out" />
        )
      ) : (
        <div className="loader" />
      )}
    </button>
  );
}

export default Logout;
