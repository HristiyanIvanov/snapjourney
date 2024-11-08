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

  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMapModalVisible, setMapModalVisible] = useState(false);

  const {
    data: coordinates,
    isLoading,
    error,
  } = useFetchCoordinates(selectedLocation);

  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { toggleInteraction, isLiked, isDisliked } = useInteraction();

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
            username={
              users?.data?.find((user) => user.id === post.user_id)?.username
            }
            onOpenLocationModal={() => openLocationModal(post.location)}
          />
        ))}
      <Modal
        isVisible={isCommentModalVisible}
        onClose={closeCommentModal}
        title="Comments"
      >
        {selectedPostId && <Comments postId={selectedPostId} posts={posts} />}
      </Modal>
      <MapModal
        latitude={coordinates?.latitude}
        longitude={coordinates?.longitude}
        isVisible={isMapModalVisible}
        onClose={closeLocationModal}
        isLoading={isLoading}
        error={error}
      />

      {!hasMore && <p className="text-gray-500">No more posts</p>}
    </div>
  );
}

export default Posts;
