import NewPost from "./post/NewPost";
import Posts from "./post/Posts";
import { useGetPosts } from "./post/useGetPosts";
function Container() {
  const { refetch } = useGetPosts();
  return (
    <div className="flex flex-col gap-4">
      <NewPost refetchPosts={refetch} />
      <Posts refetch={refetch} />
    </div>
  );
}

export default Container;
