import { Route, Routes, useParams } from "react-router-dom";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import PageNotFound from "../ui/PageNotFound";
import SinglePost from "./post/SinglePost";
import SearchResults from "./search/SearchResults";
import SettingsPage from "../pages/SettingsPage";
function Container() {
  const { postId } = useParams();
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:username/*" element={<Profile />} />
      <Route path="/post/:postId/*" element={<SinglePost postId={postId} />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Container;
