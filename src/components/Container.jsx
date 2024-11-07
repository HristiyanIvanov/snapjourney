import { Route, Routes } from "react-router-dom";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import PageNotFound from "../ui/PageNotFound";
function Container() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:username/*" element={<Profile />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Container;
