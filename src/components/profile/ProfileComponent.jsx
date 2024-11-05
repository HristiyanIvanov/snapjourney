import { useGetUsers } from "./useGetUsers";
import { useGetInteractions } from "../post/useGetInteractions";
import { useGetPosts } from "../post/useGetPosts";
import MyProfile from "../../ui/MyProfile";
import { useUser } from "../auth/useUser";
import { useGetFollowers } from "./useGetFollowers";
import { useState } from "react";

function ProfileComponent() {
  const { users, isLoading: usersLoading } = useGetUsers();
  const { user, isLoading: userLoading } = useUser();
  const { interactions, isLoading: interactionsLoading } = useGetInteractions();
  const { posts, isLoading: postsLoading } = useGetPosts();
  const { followers, isLoading: followersLoading } = useGetFollowers();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  function postsCountForUser(userId) {
    return posts?.data.filter((post) => post.user_id === userId).length;
  }
  function likesCountForUser(userId) {
    return interactions?.data.filter(
      (interaction) =>
        interaction.user_id === userId && interaction.type === "like",
    ).length;
  }

  if (
    usersLoading ||
    userLoading ||
    interactionsLoading ||
    postsLoading ||
    followersLoading
  ) {
    return <div className="loader" />;
  }
  const currentUser = users.data?.find((u) => u.id === user?.id);

  const userPosts = posts?.data.filter(
    (post) => post.user_id === currentUser?.id,
  );

  const userFollowersCount = followers?.data.filter(
    (follower) => follower.follower_id === currentUser?.id,
  ).length;

  const userFollowedCount = followers?.data.filter(
    (follower) => follower.followed_id === currentUser?.id,
  ).length;

  function handleEditProfile() {
    setEditModalVisible(true);
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setPostModalVisible(true);
  };

  const handleClosePostModal = () => {
    setPostModalVisible(false);
    setSelectedPost(null);
  };

  return currentUser ? (
    <MyProfile
      avatar={currentUser.avatar_url}
      username={currentUser.username}
      fullName={currentUser.full_name}
      bio={currentUser.bio}
      postsCount={postsCountForUser(currentUser.id)}
      likesCount={likesCountForUser(currentUser.id)}
      posts={userPosts}
      key={currentUser.id}
      followers={userFollowersCount}
      followed={userFollowedCount}
      handleEditProfile={handleEditProfile}
      isEditModalVisible={isEditModalVisible}
      setEditModalVisible={setEditModalVisible}
      isPostModalVisible={isPostModalVisible}
      selectedPost={selectedPost}
      handleClosePostModal={handleClosePostModal}
      handlePostClick={handlePostClick}
    />
  ) : (
    <div className="text-center text-xl font-light text-gray-600 md:text-3xl">
      User not found
    </div>
  );
}

export default ProfileComponent;
