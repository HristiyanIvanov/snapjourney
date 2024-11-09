import { useGetUsers } from "./useGetUsers";
import { useGetInteractions } from "../post/useGetInteractions";
import { useGetPosts } from "../post/useGetPosts";
import MyProfile from "../../ui/MyProfile";
import { useUser } from "../auth/useUser";
import { useGetFollowers } from "./useGetFollowers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFollowUser, useUnfollowUser } from "./useFollowers";
import { useCreateNotification } from "../notifications/useNotifications";

function ProfileComponent() {
  const { users, isLoading: usersLoading } = useGetUsers();
  const { user, isLoading: userLoading } = useUser();
  const { interactions, isLoading: interactionsLoading } = useGetInteractions();
  const { posts, isLoading: postsLoading } = useGetPosts();
  const { followers, isLoading: followersLoading } = useGetFollowers();
  const { followUser, isLoading: followLoading } = useFollowUser();
  const { unfollowUser, isLoading: unfollowLoading } = useUnfollowUser();
  const { createNewNotification } = useCreateNotification();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [isFollowersModalVisible, setIsFollowersModalVisible] = useState(false);
  const [isFollowingsModalVisible, setIsFollowingsModalVisible] =
    useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { username } = useParams();
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
    followersLoading ||
    followLoading ||
    unfollowLoading
  ) {
    return <div className="loader" />;
  }
  const currentUser = users.data?.find((u) => u.username === username) || user;

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

  const isCurrentUser = currentUser?.id === user?.id;

  const handleFollow = () => {
    followUser({
      follower_id: user.id,
      followed_id: currentUser.id,
    });
    createNewNotification({
      type: "follow",
      trigger_user_id: user.id,
      target_user_id: currentUser.id,
    });
  };

  const handleUnfollow = () => {
    unfollowUser(currentUser.id);
  };

  const handleFollowersClick = () => {
    setIsFollowersModalVisible(true);
  };

  const handleFollowingsClick = () => {
    setIsFollowingsModalVisible(true);
  };

  const userFollowers = users.data.filter(
    (user) =>
      followers?.data.some(
        (f) => f.follower_id === user.id && f.followed_id === currentUser?.id,
      ) && user.id !== currentUser?.id,
  );

  const userFollowings = users.data.filter(
    (user) =>
      followers?.data.some(
        (f) => f.follower_id === currentUser?.id && f.followed_id === user.id,
      ) && user.id !== currentUser?.id,
  );

  const isFollowing = followers?.data.some(
    (follower) =>
      follower.follower_id === user?.id &&
      follower.followed_id === currentUser?.id,
  );
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
      followersArr={followers?.data}
      handleEditProfile={handleEditProfile}
      isEditModalVisible={isEditModalVisible}
      setEditModalVisible={setEditModalVisible}
      isPostModalVisible={isPostModalVisible}
      selectedPost={selectedPost}
      handleClosePostModal={handleClosePostModal}
      handlePostClick={handlePostClick}
      isCurrentUser={isCurrentUser}
      isFollowing={isFollowing}
      onFollow={handleFollow}
      onUnfollow={handleUnfollow}
      isFollowersModalVisible={isFollowersModalVisible}
      isFollowingsModalVisible={isFollowingsModalVisible}
      setIsFollowersModalVisible={setIsFollowersModalVisible}
      setIsFollowingsModalVisible={setIsFollowingsModalVisible}
      handleFollowersClick={handleFollowersClick}
      handleFollowingsClick={handleFollowingsClick}
      userFollowers={userFollowers}
      userFollowings={userFollowings}
    />
  ) : (
    <div className="text-center text-xl font-light text-gray-600 md:text-3xl">
      User not found
    </div>
  );
}

export default ProfileComponent;
