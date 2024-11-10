import { Link } from "react-router-dom";

export default function getNotificationText(notification, triggerUser) {
  const { type, related_post_id, related_comment_id } = notification;

  switch (type) {
    case "follow":
      return (
        <>
          <Link
            to={`/profile/${triggerUser?.username}`}
            className="cursor-pointer font-bold text-teal-500 duration-300 hover:text-teal-600"
          >
            @{triggerUser?.username || "Someone"}
          </Link>
          {` started following you.`}
        </>
      );

    case "like":
      return (
        <>
          <Link
            to={`/profile/${triggerUser?.username}`}
            className="cursor-pointer font-bold text-teal-500 duration-300 hover:text-teal-600"
          >
            @{triggerUser?.username || "Someone"}
          </Link>
          {` liked your `}
          <Link
            to={`/post/${related_post_id}`}
            className="cursor-pointer font-bold text-teal-500 duration-300 hover:text-teal-600"
          >
            post
          </Link>
          .
        </>
      );

    case "dislike":
      return (
        <>
          <Link
            to={`/profile/${triggerUser?.username}`}
            className="cursor-pointer font-bold text-teal-500 duration-300 hover:text-teal-600"
          >
            @{triggerUser?.username || "Someone"}
          </Link>
          {` disliked your `}
          <Link
            to={`/post/${related_post_id}`}
            className="cursor-pointer font-bold text-teal-500 duration-300 hover:text-teal-600"
          >
            post
          </Link>
          .
        </>
      );

    case "comment":
      return (
        <>
          <Link
            to={`/profile/${triggerUser?.username}`}
            className="cursor-pointer font-bold text-teal-500 transition-all duration-300 hover:text-teal-600"
          >
            @{triggerUser?.username || "Someone"}
          </Link>
          {` commented on your `}
          <Link
            to={`/post/${related_post_id}#comment-${related_comment_id}`}
            className="cursor-pointer font-bold text-teal-500 transition-all duration-300 hover:text-teal-600"
          >
            post
          </Link>
          .
        </>
      );

    default:
      return "Unknown notification";
  }
}
