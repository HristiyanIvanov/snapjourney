import { GoSignOut } from "react-icons/go";
import SideBarItem from "../../ui/SideBarItem";
import { useLogout } from "./useLogout";
function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <button onClick={logout}>
      {!isLoading ? (
        <SideBarItem icon={<GoSignOut />} title="Log out" />
      ) : (
        <div className="loader" />
      )}
    </button>
  );
}

export default Logout;
