import { forwardRef } from "react";
import {
  GoComment,
  GoThumbsdown,
  GoThumbsup,
  GoPencil,
  GoTrash,
} from "react-icons/go";
import { Link } from "react-router-dom";
import { truncateText } from "../utils/truncateText";

function Post(
  {
    description,
    postImage,
    name,
    profile_pic,
    time_ago,
    location,
    likes,
    dislikes,
    onLike,
    onDislike,
    isLiked,
    isDisliked,
    onOpenCommentModal,
    username,
    onOpenLocationModal,
    onEditPost,
    onDeletePost,
    currUserPosts,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="group flex flex-row items-center gap-2">
          <Link to={`/profile/${username}`}>
            <img
              className="size-16 cursor-pointer rounded-full duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
              src={profile_pic}
              alt="Profile pic"
            />
          </Link>
          <div>
            <Link to={`/profile/${username}`} className="cursor-pointer">
              <h1 className="relative z-0 cursor-pointer text-lg font-light transition-colors duration-200 ease-in-out group-hover:text-teal-600 sm:block sm:text-xl lg:text-2xl dark:group-hover:text-teal-400">
                {name}
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-600 transition-transform duration-200 ease-in-out group-hover:scale-x-100 dark:bg-teal-400"></span>
              </h1>
            </Link>
            <p className="text-sm sm:text-base">{time_ago}</p>
            <h1
              className="block text-sm sm:text-base md:hidden"
              onClick={onOpenLocationModal}
            >
              {truncateText(location, 30)}
            </h1>
          </div>
        </div>
        <h1
          className="hidden hover:cursor-pointer md:block"
          onClick={onOpenLocationModal}
        >
          {truncateText(location, 70)}
        </h1>
      </div>
      <div className="text-lg sm:block md:text-xl lg:text-2xl">
        {description}
      </div>

      <img className="size-auto" src={postImage} alt="Post image" />
      <div className="border-t border-gray-400 dark:border-gray-600"></div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <button
            className={`flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 ${
              isLiked
                ? "bg-blue-300 dark:bg-blue-600 dark:text-white"
                : "hover:bg-blue-300 dark:text-white dark:hover:bg-blue-600"
            } text-xl`}
            onClick={onLike}
          >
            <GoThumbsup />
            <p className="hidden sm:block">Like</p>
            <p
              className={`rounded-full transition-all duration-300 ${isLiked ? "bg-blue-300 dark:bg-gray-700 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} px-2`}
            >
              {likes}
            </p>
          </button>
          <button
            className={`flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 ${
              isDisliked
                ? "bg-red-300 dark:bg-red-600 dark:text-white"
                : "hover:bg-red-300 dark:text-white dark:hover:bg-red-600"
            } text-xl`}
            onClick={onDislike}
          >
            <GoThumbsdown />
            <p className="hidden sm:block">Dislike</p>
            <p
              className={`rounded-full transition-all duration-300 ${isDisliked ? "bg-red-300 dark:bg-gray-700 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} px-2`}
            >
              {dislikes}
            </p>
          </button>
          <button
            className="flex flex-row items-center gap-2 rounded-xl p-2 text-xl transition-all duration-300 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            onClick={onOpenCommentModal}
          >
            <GoComment />
            <p className="hidden sm:block">Comment</p>
          </button>
        </div>
        {currUserPosts && (
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 text-xl text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              onClick={onEditPost}
            >
              <GoPencil />
              <p className="hidden sm:block">Edit</p>
            </button>
            <button
              className="flex items-center gap-2 text-xl text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
              onClick={onDeletePost}
            >
              <GoTrash /> <p className="hidden sm:block">Delete</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const PostRef = forwardRef(Post);
export default PostRef;
