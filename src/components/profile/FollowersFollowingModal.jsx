import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

function FollowersFollowingModal({
  isVisible,
  onClose,
  isFollowers,
  userFollowers,
  userFollowings,
}) {
  const listToShow = isFollowers ? userFollowers : userFollowings;

  const handleUsernameClick = () => {
    onClose();
  };
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title={isFollowers ? "Followers" : "Following"}
    >
      <div className="mb-4 space-y-2">
        {listToShow.length > 0 ? (
          listToShow.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              key={user.id}
              className="flex items-center space-x-2 rounded-lg bg-gray-50 p-2 duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleUsernameClick}
            >
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-gray-800 dark:text-gray-300">
                {user.full_name}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No {isFollowers ? "followers" : "followings"} yet.
          </p>
        )}
      </div>
      <Button color="teal" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
}

export default FollowersFollowingModal;
