import NewPost from "../components/newPost/NewPost";
import Posts from "../components/post/Posts";
import { useGetPosts } from "../components/post/useGetPosts";

function Feed() {
  const { refetch } = useGetPosts();
  return (
    <div className="flex flex-col gap-4">
      <NewPost refetchPosts={refetch} />
      <Posts />
    </div>
  );
}

export default Feed;
