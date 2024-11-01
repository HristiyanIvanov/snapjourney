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
import { useUser } from "../auth/useUser";
import { useCreateInteraction, useDeleteInteraction } from "./useInteractions";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../../ui/Modal";
import Comments from "./CommentsModal";

function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const { page, hasMore, setLoadingMore, incrementPage, setHasMore } =
    usePagination(1);

  const {
    isLoading: isLoadingPosts,
    posts,
    error: errorPosts,
  } = useGetPosts(page, 5);

  const { isLoading: isLoadingUsers, users, error: errorUsers } = useGetUsers();
  const {
    isLoading: isLoadingInteractions,
    interactions,
    error: errorInteractions,
  } = useGetInteractions();

  const { lastPostRef, scrollPositionRef } = useInfiniteScroll(
    isLoadingPosts,
    hasMore,
    incrementPage,
  );

  const { user } = useUser();
  const { createNewInteraction } = useCreateInteraction();
  const { deleteExistingInteraction } = useDeleteInteraction();
  const queryClient = useQueryClient();
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
    setSelectedPostId(null);
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
    if (posts?.data.length < 5) {
      setHasMore(false);
    }
    setLoadingMore(false);
  }, [posts, scrollPositionRef, setHasMore, setLoadingMore, page]);

  if (isLoadingPosts || isLoadingUsers || isLoadingInteractions) {
    return <div className="loader" />;
  }

  if (errorPosts || errorUsers || errorInteractions) {
    toast.error(
      `Error: ${errorPosts?.message || errorUsers?.message || errorInteractions?.message}`,
    );
  }

  const toggleInteraction = (postId, interactionType) => {
    const existingInteraction = interactions?.data.find(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === interactionType,
    );

    if (existingInteraction) {
      deleteExistingInteraction(existingInteraction.id);
    } else {
      createNewInteraction({
        post_id: postId,
        user_id: user?.id,
        type: interactionType,
      });

      const oppositeInteractionType =
        interactionType === "like" ? "dislike" : "like";
      const oppositeInteraction = interactions?.data.find(
        (interaction) =>
          interaction.post_id === postId &&
          interaction.user_id === user?.id &&
          interaction.type === oppositeInteractionType,
      );

      if (oppositeInteraction) {
        deleteExistingInteraction(oppositeInteraction.id);
      }
    }

    queryClient.invalidateQueries("posts");
    queryClient.invalidateQueries("interactions");
  };

  const isLiked = (postId) => {
    return interactions?.data.some(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === "like",
    );
  };

  const isDisliked = (postId) => {
    return interactions?.data.some(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === "dislike",
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {allPosts
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post, index) => (
          <Post
            key={post.id || `post-${index}`}
            name={
              users?.data?.find((user) => user.id === post.user_id)?.full_name
            }
            location={post.location}
            time_ago={timeAgo(post.created_at)}
            profile_pic={
              users?.data?.find((user) => user.id === post.user_id)?.avatar_url
            }
            description={post.description}
            postImage={post.photo_url}
            likes={countLikes(post.id, interactions?.data, "like")}
            dislikes={countLikes(post.id, interactions?.data, "dislike")}
            onLike={() => toggleInteraction(post.id, "like")}
            onDislike={() => toggleInteraction(post.id, "dislike")}
            ref={index === allPosts.length - 1 ? lastPostRef : null}
            isLiked={isLiked(post.id)}
            isDisliked={isDisliked(post.id)}
            onOpenCommentModal={() => openCommentModal(post.id)}
          />
        ))}
      <Modal
        isVisible={isCommentModalVisible}
        onClose={closeCommentModal}
        title="Comments"
      >
        {selectedPostId && <Comments postId={selectedPostId} />}
      </Modal>

      {!hasMore && <p className="text-gray-500">No more posts</p>}
    </div>
  );
}

export default Posts;
