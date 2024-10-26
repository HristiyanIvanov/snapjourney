import NewPost from "./post/NewPost";
import Posts from "./post/Posts";
function Container() {
  return (
    <div className="flex flex-col gap-4">
      <NewPost />
      <Posts />
    </div>
  );
}

export default Container;
