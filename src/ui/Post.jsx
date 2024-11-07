import { forwardRef } from "react";
import { GoComment, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { Link } from "react-router-dom";

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
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
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
              <h1 className="relative z-0 cursor-pointer text-lg font-light transition-colors duration-200 ease-in-out group-hover:text-teal-600 sm:block sm:text-xl lg:text-2xl">
                {name}
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-600 transition-transform duration-200 ease-in-out group-hover:scale-x-100"></span>
              </h1>
            </Link>
            <p className="text-sm sm:text-base">{time_ago}</p>
            <h1
              className="block text-sm sm:text-base md:hidden"
              onClick={onOpenLocationModal}
            >
              {location}
            </h1>
          </div>
        </div>
        <h1
          className="hidden hover:cursor-pointer md:block"
          onClick={onOpenLocationModal}
        >
          {location}
        </h1>
      </div>
      <div className="text-lg sm:block md:text-xl lg:text-2xl">
        {description}
      </div>
      <img className="size-auto" src={postImage} alt="Post image" />
      <div className="border-t border-gray-400"></div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <button
            className={`flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 ${
              isLiked ? "bg-blue-300" : "hover:bg-blue-300"
            } text-xl`}
            onClick={onLike}
          >
            <GoThumbsup />
            <p className="hidden sm:block">Like</p>
            <p
              className={`rounded-full transition-all duration-300 ${isLiked ? "bg-blue-300" : "bg-gray-200"} px-2`}
            >
              {likes}
            </p>
          </button>
          <button
            className={`flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 ${
              isDisliked ? "bg-red-300" : "hover:bg-red-300"
            } text-xl`}
            onClick={onDislike}
          >
            <GoThumbsdown />
            <p className="hidden sm:block">Dislike</p>
            <p
              className={`rounded-full transition-all duration-300 ${isDisliked ? "bg-red-300" : "bg-gray-200"} px-2`}
            >
              {dislikes}
            </p>
          </button>
          <button
            className="flex flex-row items-center gap-2 rounded-xl p-2 text-xl transition-all duration-300 hover:bg-gray-200"
            onClick={onOpenCommentModal}
          >
            <GoComment />
            <p className="hidden sm:block">Comment</p>
          </button>
        </div>
      </div>
    </div>
  );
}

const PostRef = forwardRef(Post);
export default PostRef;
