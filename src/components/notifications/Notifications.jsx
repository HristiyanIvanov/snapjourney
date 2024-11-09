import Notification from "../../ui/Notification";
import NotificationMobile from "../../ui/NotificationMobile";
import { useUser } from "../auth/useUser";
import { useGetUsers } from "../profile/useGetUsers";
import { useGetNotifications } from "./useGetNotifications";
import {
  useDeleteNotification,
  useUpdateNotification,
} from "./useNotifications";

function Notifications({ isNotificationsOpen, toggleNotifications, isMobile }) {
  const { notifications, isLoading } = useGetNotifications();
  const { users, isLoading: isLoadingUsers } = useGetUsers();
  const { user } = useUser();
  const { updateExistingNotification } = useUpdateNotification();
  const { deleteExistingNotification } = useDeleteNotification();
  const currentUser = users?.data?.find((u) => u.id === user?.id);

  const markAsRead = (id) => {
    const notification = notifications?.data?.find((n) => n.id === id);
    if (notification) {
      updateExistingNotification({ id: notification.id, is_read: true });
    }
  };
  const markAllAsRead = () => {
    notifications?.data?.forEach((n) => {
      updateExistingNotification({ id: n.id, is_read: true });
    });
  };

  const markAllAsUnread = () => {
    notifications?.data?.forEach((n) => {
      updateExistingNotification({ id: n.id, is_read: false });
    });
  };

  const markAsUnread = (id) => {
    const notification = notifications?.data?.find((n) => n.id === id);
    if (notification) {
      updateExistingNotification({ id: notification.id, is_read: false });
    }
  };
  const deleteNotifications = () => {
    notifications?.data?.forEach((n) => {
      deleteExistingNotification(n.id);
    });
  };

  if (isLoading || isLoadingUsers) return null;
  return (
    <>
      {!isMobile ? (
        <Notification
          isNotificationsOpen={isNotificationsOpen}
          toggleNotifications={toggleNotifications}
          notifications={notifications?.data}
          users={users}
          currentUser={currentUser}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          markAllAsUnread={markAllAsUnread}
          markAsUnread={markAsUnread}
          deleteNotifications={deleteNotifications}
        />
      ) : (
        <NotificationMobile
          isNotificationsOpen={isNotificationsOpen}
          toggleNotifications={toggleNotifications}
          notifications={notifications?.data}
          users={users}
          currentUser={currentUser}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          markAllAsUnread={markAllAsUnread}
          markAsUnread={markAsUnread}
          deleteNotifications={deleteNotifications}
        />
      )}
    </>
  );
}

export default Notifications;
