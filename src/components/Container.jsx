import { Route, Routes } from "react-router-dom";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";

function Container() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="profile/:username/*" element={<Profile />} />
    </Routes>
  );
}

export default Container;
