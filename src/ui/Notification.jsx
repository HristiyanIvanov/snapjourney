import { GoEye, GoEyeClosed, GoX } from "react-icons/go";
import getNotificationText from "../components/notifications/getNotificationsText";

function Notification({
  isNotificationsOpen,
  notifications,
  users,
  currentUser,
  toggleNotifications,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  markAllAsUnread,
  deleteNotifications,
}) {
  return (
    isNotificationsOpen && (
      <div className="fixed right-0 top-0 z-50 h-[100vh] w-auto overflow-y-scroll border border-gray-300 bg-white p-5 shadow-2xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50">
        <div className="mb-4 flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div
            className="text-2xl duration-300 hover:cursor-pointer hover:text-red-400"
            onClick={toggleNotifications}
          >
            <GoX />
          </div>
        </div>
        {notifications.filter(
          (notification) => notification.trigger_user_id !== currentUser?.id,
        ).length > 0 && (
          <div className="mb-4 flex justify-between">
            <button
              className="text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-600"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
            <button
              className="text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-600"
              onClick={markAllAsUnread}
            >
              Mark all as unread
            </button>
          </div>
        )}

        {notifications.filter(
          (notification) => notification.trigger_user_id !== currentUser?.id,
        ).length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            You have no notifications at the moment.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {notifications
            .filter(
              (notification) =>
                notification.trigger_user_id !== currentUser?.id,
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 15)
            .map((notification) => {
              const triggerUser = users?.data?.find(
                (u) => u.id === notification.trigger_user_id,
              );

              const notificationStyle = notification.is_read
                ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-200"
                : "bg-teal-50 text-teal-700 font-semibold dark:bg-teal-800 dark:text-teal-400 dark:hover:bg-teal-700 hover:bg-teal-100";

              return (
                <div
                  key={notification.id}
                  className={`rounded-lg p-3 ${notificationStyle} hover:cursor-pointer`}
                  onClick={() => {
                    if (!notification.is_read) {
                      markAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={triggerUser?.avatar_url}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        {getNotificationText(
                          notification,
                          triggerUser,
                          currentUser,
                        )}
                      </div>
                    </div>
                    {notification.is_read ? (
                      <GoEyeClosed
                        className="ml-5 text-xl duration-300 hover:text-teal-700 dark:hover:text-teal-600"
                        onClick={() => markAsUnread(notification.id)}
                      />
                    ) : (
                      <GoEye
                        className="ml-5 text-xl duration-300 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => markAsRead(notification.id)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        {notifications.filter(
          (notification) => notification.trigger_user_id !== currentUser?.id,
        ).length > 0 && (
          <button
            className="mt-4 text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-600"
            onClick={deleteNotifications}
          >
            Delete all
          </button>
        )}
      </div>
    )
  );
}

export default Notification;
