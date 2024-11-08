import { Route, Routes, useParams } from "react-router-dom";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import PageNotFound from "../ui/PageNotFound";
import SinglePost from "./post/SinglePost";
function Container() {
  const { postId } = useParams();
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:username/*" element={<Profile />} />
      <Route path="/post/:postId/*" element={<SinglePost postId={postId} />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Container;
