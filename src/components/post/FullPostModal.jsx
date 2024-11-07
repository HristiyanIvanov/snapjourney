import {
  GoCheck,
  GoPencil,
  GoThumbsdown,
  GoThumbsup,
  GoTrash,
  GoX,
} from "react-icons/go";
import Modal from "../../ui/Modal";
import { timeAgo } from "../../utils/convertDate";
import { useComment } from "./useComment";
import Button from "../../ui/Button";
import { useInteraction } from "./useInteraction";
import { countLikes } from "../../utils/countLikes";
import { useGetInteractions } from "./useGetInteractions";
import { useState } from "react";
import { Link } from "react-router-dom";

function FullPostModal({ isVisible, onClose, post }) {
  const { toggleInteraction } = useInteraction();
  const { interactions } = useGetInteractions();
  const {
    comments: commentList,
    handleAddComment,
    newComment,
    setNewComment,
    handleDeleteComment,
    handleEditComment,
    user,
    users,
  } = useComment(post?.id);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  if (!isVisible || !post) return null;

  const getCommentUserName = (userId) => {
    return (
      users?.data?.find((user) => user.id === userId)?.full_name || "Anonymous"
    );
  };
  const isLiked = interactions?.data.some(
    (interaction) =>
      interaction.post_id === post?.id &&
      interaction.user_id === user?.id &&
      interaction.type === "like",
  );
  const isDisliked = interactions?.data.some(
    (interaction) =>
      interaction.post_id === post?.id &&
      interaction.user_id === user?.id &&
      interaction.type === "dislike",
  );
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comment);
  };

  const handleUpdateComment = () => {
    handleEditComment(editingCommentId, editedComment);
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleUsernameClick = () => {
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title={`${users?.data?.find((user) => user.id === post.user_id)?.full_name}'s Post`}
    >
      <div className="flex max-h-[75vh] max-w-[90vw] flex-col gap-4 overflow-y-auto sm:max-h-[75vh] sm:max-w-md">
        <h2 className="text-lg font-light">{post.description}</h2>
        <img
          src={post.photo_url}
          alt="Full Post"
          className="max-h-[59vh] w-[90vw] rounded-lg object-cover"
        />

        <div className="flex justify-center gap-10">
          <h1 className="text-sm font-light">
            The post is liked by{" "}
            {countLikes(post.id, interactions?.data, "like")} people and
            disliked by {countLikes(post.id, interactions?.data, "dislike")}{" "}
            people
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => toggleInteraction(post.id, "like")}
              className={`flex items-center gap-1 rounded-lg border border-blue-400 px-2 py-2 text-white transition-colors duration-300 ${
                isLiked
                  ? "bg-blue-400 hover:bg-blue-500"
                  : "text-blue-400 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <GoThumbsup className="h-5 w-5" />
              <span>{isLiked ? "Liked" : "Like"}</span>
            </button>
            <button
              onClick={() => toggleInteraction(post.id, "dislike")}
              className={`flex items-center gap-1 rounded-lg border border-red-400 px-2 py-2 text-white transition-colors duration-300 ${
                isDisliked
                  ? "bg-red-400 hover:bg-red-500"
                  : "text-red-400 hover:bg-red-500 hover:text-white"
              }`}
            >
              <GoThumbsdown className="h-5 w-5" />
              <span>{isDisliked ? "Disliked" : "Dislike"}</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Comments</h3>
          {commentList && commentList.length > 0 ? (
            commentList.map((comment) => (
              <div
                key={comment.id}
                className="mb-2 border-b border-gray-200 pb-2"
              >
                <p className="break-words text-sm">
                  <Link
                    to={`/profile/${users?.data?.find((user) => user.id === comment.user_id)?.username}`}
                    onClick={handleUsernameClick}
                    className="font-semibold text-teal-500 transition-colors hover:text-teal-600"
                  >
                    {getCommentUserName(comment.user_id)}
                  </Link>
                  :{" "}
                  {editingCommentId === comment.id ? (
                    <textarea
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 p-1 outline-teal-400"
                    />
                  ) : (
                    comment.comment
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {timeAgo(comment.created_at)}
                </p>
                {editingCommentId === comment.id ? (
                  <div className="mt-2 flex gap-2">
                    <button onClick={handleUpdateComment}>
                      <GoCheck />
                    </button>
                    <button onClick={() => setEditingCommentId(null)}>
                      <GoX />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    {comment?.user_id === user?.id && (
                      <>
                        <button onClick={() => handleStartEdit(comment)}>
                          <GoPencil />
                        </button>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                          <GoTrash />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-lg border border-gray-200 p-2 outline-teal-400"
            rows={1}
          />
          <Button onClick={handleAddComment} color="teal">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default FullPostModal;
