import { useParams } from "react-router-dom";
import { useGetPostById } from "./useGetPosts";
import { useGetUsers } from "../profile/useGetUsers";
import { countLikes } from "../../utils/countLikes";
import { useGetInteractions } from "./useGetInteractions";
import { timeAgo } from "../../utils/convertDate";
import { useInteraction } from "./useInteraction";
import { useState } from "react";
import Post from "../../ui/Post";
import MapModal from "./MapModal";
import Modal from "../../ui/Modal";
import Comments from "./CommentsModal";
import { useFetchCoordinates } from "./useGetCoordinates";
function SinglePost() {
  const { postId } = useParams();
  const { post, isLoading: isLoadingPost } = useGetPostById(postId);
  const { isLoading: isLoadingUsers, users } = useGetUsers();
  const { isLoading: isLoadingInteractions, interactions } =
    useGetInteractions();
  const { toggleInteraction, isLiked, isDisliked } = useInteraction();

  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const {
    data: coordinates,
    isLoading,
    error,
  } = useFetchCoordinates(selectedLocation);

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
  if (isLoadingPost || isLoadingUsers || isLoadingInteractions)
    return <div className="loader" />;

  return (
    <div className="flex flex-col items-center gap-4">
      <Post
        key={post?.id}
        name={users?.data?.find((user) => user.id === post?.user_id)?.full_name}
        location={post?.location}
        time_ago={timeAgo(post?.created_at)}
        profile_pic={
          users?.data?.find((user) => user.id === post?.user_id)?.avatar_url
        }
        description={post?.description}
        postImage={post?.photo_url}
        likes={countLikes(post?.id, interactions?.data, "like")}
        dislikes={countLikes(post?.id, interactions?.data, "dislike")}
        onLike={() => toggleInteraction(post?.id, "like")}
        onDislike={() => toggleInteraction(post?.id, "dislike")}
        ref={null}
        isLiked={isLiked(post?.id)}
        isDisliked={isDisliked(post?.id)}
        onOpenCommentModal={() => openCommentModal(post?.id)}
        username={
          users?.data?.find((user) => user.id === post?.user_id)?.username
        }
        onOpenLocationModal={() => openLocationModal(post?.location)}
      />
      <Modal
        isVisible={isCommentModalVisible}
        onClose={closeCommentModal}
        title="Comments"
      >
        {selectedPostId && <Comments postId={selectedPostId} />}
      </Modal>
      <MapModal
        latitude={coordinates?.latitude}
        longitude={coordinates?.longitude}
        isVisible={isMapModalVisible}
        onClose={closeLocationModal}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default SinglePost;
