import NewPost from "../components/newPost/NewPost";
import Posts from "../components/post/Posts";
import { useGetPosts } from "../components/post/useGetPosts";
import Search from "../components/search/Search";

function Feed() {
  const { refetch } = useGetPosts();
  return (
    <div className="flex flex-col gap-4">
      <Search />
      <NewPost refetchPosts={refetch} />
      <Posts />
    </div>
  );
}

export default Feed;
