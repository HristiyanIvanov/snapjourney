import { GoComment, GoThumbsup } from "react-icons/go";

function Post({
  description,
  postImage,
  name,
  profile_pic,
  time_ago,
  location,
  likes,
}) {
  return (
    <div className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600">
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
      <img className="size-auto" src={postImage} />
      <div className="border-t border-gray-400"></div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <button className="flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 hover:bg-gray-200 md:text-xl">
            <GoThumbsup />
            <p>Like</p>
          </button>
          <button className="flex flex-row items-center gap-2 rounded-xl p-2 text-base transition-all duration-300 hover:bg-gray-200 md:text-xl">
            <GoComment />
            <p>Comment</p>
          </button>
        </div>
        <h1 className="block text-sm md:hidden">{likes} likes</h1>
        <h1 className="hidden md:block">Liked by {likes} people</h1>
      </div>
    </div>
  );
}

export default Post;
