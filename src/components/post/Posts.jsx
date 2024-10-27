import Post from "../../ui/Post";
import { useGetUsers } from "../profile/useGetUsers";
import { useGetPosts } from "./useGetPosts";
import { timeAgo } from "../../utils/convertDate";
import toast from "react-hot-toast";
import { useGetInteractions } from "./useGetInteractions";
import { countLikes } from "../../utils/countLikes";

function Posts() {
  const { isLoading: isLoadingPosts, posts, error: errorPosts } = useGetPosts();
  const { isLoading: isLoadingUsers, users, error: errorUsers } = useGetUsers();
  const {
    isLoading: isLoadingInteractions,
    interactions,
    error: errorInteractions,
  } = useGetInteractions();
  if (isLoadingPosts || isLoadingUsers || isLoadingInteractions) {
    return <div className="loader" />;
  }

  if (errorPosts || errorUsers || errorInteractions) {
    return toast.error(
      `Error: ${errorPosts?.message || errorUsers?.message || errorInteractions?.message}`,
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {posts?.data
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post) => (
          <Post
            key={post.id}
            name={
              users?.data?.find((user) => user.id === post.user_id)?.full_name
            }
            location={post.location}
            time_ago={timeAgo(post.created_at)}
            profile_pic={
              users?.data?.find((user) => user.id === post.user_id)?.avatar_url
            }
            description={post.description}
            postImage={post.photo_url}
            likes={countLikes(post.id, interactions?.data)}
          />
        ))}
    </div>
  );
}

export default Posts;
