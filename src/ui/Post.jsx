import { forwardRef } from "react";
import { GoComment, GoThumbsdown, GoThumbsup } from "react-icons/go";

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
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600"
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <img
            className="size-16 rounded-full"
            src={profile_pic}
            alt="Profile pic"
          />
          <div>
            <h1 className="text-lg font-light sm:block sm:text-xl lg:text-2xl">
              {name}
            </h1>
            <p className="text-sm sm:text-base">{time_ago}</p>
            <h1 className="block text-sm sm:text-base md:hidden">{location}</h1>
          </div>
        </div>
        <h1 className="hidden md:block">{location}</h1>
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
              isLiked ? "bg-green-200" : "hover:bg-gray-200"
            } text-xl`}
            onClick={onLike}
          >
            <GoThumbsup />
            <p className="hidden sm:block">Like</p>
            <p
              className={`rounded-full transition-all duration-300 ${isLiked ? "bg-green-200" : "bg-gray-200"} px-2`}
            >
              {likes}
            </p>
          </button>
          <button
            className={`flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 ${
              isDisliked ? "bg-red-200" : "hover:bg-gray-200"
            } text-xl`}
            onClick={onDislike}
          >
            <GoThumbsdown />
            <p className="hidden sm:block">Dislike</p>
            <p
              className={`rounded-full transition-all duration-300 ${isDisliked ? "bg-red-200" : "bg-gray-200"} px-2`}
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
