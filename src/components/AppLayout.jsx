import Container from "./Container";
import Sidebar from "../ui/Sidebar";
import MobileNavbar from "../ui/MobileNavbar";
import Notifications from "./notifications/Notifications";
import { useState } from "react";
function AppLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  return (
    <div className="m-auto grid grid-cols-3 gap-4 sm:grid-cols-6 dark:bg-gray-900">
      <div className="sticky top-0 hidden h-screen md:block">
        <Sidebar
          toggleNotifications={toggleNotifications}
          isNotificationsOpen={isNotificationsOpen}
        />
      </div>
      <div className="col-span-3 pb-14 pt-5 sm:col-span-4 sm:col-start-2">
        <Container />
      </div>
      <MobileNavbar
        toggleNotifications={toggleNotifications}
        isNotificationsOpen={isNotificationsOpen}
      />
      <div>
        <Notifications
          isNotificationsOpen={isNotificationsOpen}
          toggleNotifications={toggleNotifications}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default AppLayout;
