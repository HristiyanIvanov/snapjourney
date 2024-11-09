import { useEffect, useState } from "react";
import Post from "../../ui/Post";
import { useGetUsers } from "../profile/useGetUsers";
import { useGetPosts } from "./useGetPosts";
import { timeAgo } from "../../utils/convertDate";
import toast from "react-hot-toast";
import { useGetInteractions } from "./useGetInteractions";
import { countLikes } from "../../utils/countLikes";
import { usePagination } from "./usePagination";
import { useInfiniteScroll } from "./useInfiniteScroll";
import Modal from "../../ui/Modal";
import Comments from "./CommentsModal";
import { useInteraction } from "./useInteraction";
import MapModal from "./MapModal";
import { useFetchCoordinates } from "./useGetCoordinates";
import { useDeletePost, useUpdatePost } from "./useEditDeletePost";
import EditPostModal from "./EditPostModal";
import { useGetFollowedUsers } from "../profile/useGetFollowedUsers";

function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const { page, hasMore, setLoadingMore, incrementPage, setHasMore } =
    usePagination(1);
  const {
    isLoading: isLoadingPosts,
    posts,
    error: errorPosts,
  } = useGetPosts(page, 10);
  const { isLoading: isLoadingUsers, users, error: errorUsers } = useGetUsers();
  const {
    isLoading: isLoadingInteractions,
    interactions,
    error: errorInteractions,
  } = useGetInteractions();
  const { toggleInteraction, isLiked, isDisliked, user } = useInteraction();
  const { isLoading: isLoadingFollows, followedUsers } = useGetFollowedUsers(
    user?.id,
  );

  const { lastPostRef, scrollPositionRef } = useInfiniteScroll(
    isLoadingPosts,
    hasMore,
    incrementPage,
  );

  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const {
    data: coordinates,
    isLoading,
    error,
  } = useFetchCoordinates(selectedLocation);

  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { deleteExistingPost } = useDeletePost();
  const { updateExistingPost } = useUpdatePost();

  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
    setSelectedPostId(null);
  };

  const openLocationModal = (loc) => {
    setSelectedLocation(loc);
    setMapModalVisible(true);
  };

  const closeLocationModal = () => {
    setMapModalVisible(false);
    setSelectedLocation("");
  };

  const handleDeletePost = (postId) => {
    deleteExistingPost(postId);
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setIsEditModalVisible(true);
  };

  const handleSavePost = (postId, updatedData) => {
    updateExistingPost({ id: postId, obj: updatedData });
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post,
      ),
    );
  };

  useEffect(() => {
    if (posts?.data) {
      if (page === 1) {
        setAllPosts([]);
      }
      setAllPosts((prevPosts) => [...prevPosts, ...posts.data]);

      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
    if (posts?.data.length < 10) {
      setHasMore(false);
    }
    setLoadingMore(false);
  }, [posts, scrollPositionRef, setHasMore, setLoadingMore, page]);

  if (
    isLoadingPosts ||
    isLoadingUsers ||
    isLoadingInteractions ||
    isLoadingFollows
  ) {
    return <div className="loader" />;
  }

  if (errorPosts || errorUsers || errorInteractions) {
    toast.error(
      `Error: ${errorPosts?.message || errorUsers?.message || errorInteractions?.message}`,
    );
  }
  const renderPosts = () => {
    const myPostsAndFollowedPosts = allPosts.filter(
      (post) =>
        post.user_id === user?.id ||
        followedUsers?.map((user) => user.id).includes(post.user_id),
    );
    const otherPosts = allPosts.filter(
      (post) =>
        post.user_id !== user?.id &&
        !followedUsers?.map((user) => user.id).includes(post.user_id),
    );

    const renderPostList = (postsList) =>
      postsList
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post, index) => {
          const postUser = users?.data?.find(
            (user) => user.id === post.user_id,
          );
          const postLikes = countLikes(post.id, interactions?.data, "like");
          const postDislikes = countLikes(
            post.id,
            interactions?.data,
            "dislike",
          );
          const isPostOwner = postUser?.id === user?.id;

          return (
            <Post
              key={`${post.id}-${index}`}
              name={postUser?.full_name}
              location={post.location}
              time_ago={timeAgo(post.created_at)}
              profile_pic={postUser?.avatar_url}
              description={post.description}
              postImage={post.photo_url}
              likes={postLikes}
              dislikes={postDislikes}
              onLike={() => toggleInteraction(post.id, "like")}
              onDislike={() => toggleInteraction(post.id, "dislike")}
              ref={index === allPosts.length - 1 ? lastPostRef : null}
              isLiked={isLiked(post.id)}
              isDisliked={isDisliked(post.id)}
              onOpenCommentModal={() => openCommentModal(post.id)}
              username={postUser?.username}
              onOpenLocationModal={() => openLocationModal(post.location)}
              onEditPost={() => handleEditClick(post)}
              onDeletePost={() => handleDeletePost(post.id)}
              currUserPosts={isPostOwner}
            />
          );
        });

    return (
      <>
        {renderPostList(myPostsAndFollowedPosts)}
        <div className="my-4 border-b-2 border-gray-300"></div>

        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Other Posts
        </h2>
        {renderPostList(otherPosts)}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {renderPosts()}

      <Modal
        isVisible={isCommentModalVisible}
        onClose={closeCommentModal}
        title="Comments"
      >
        {selectedPostId && <Comments postId={selectedPostId} posts={posts} />}
      </Modal>

      <EditPostModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        post={currentPost}
        onSave={handleSavePost}
      />

      <MapModal
        latitude={coordinates?.latitude}
        longitude={coordinates?.longitude}
        isVisible={isMapModalVisible}
        onClose={closeLocationModal}
        isLoading={isLoading}
        error={error}
      />

      {!hasMore && (
        <p className="text-gray-500 dark:text-gray-400">No more posts</p>
      )}
    </div>
  );
}

export default Posts;
