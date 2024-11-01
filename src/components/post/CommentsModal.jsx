import { useState } from "react";
import { useGetComments } from "./useGetComments";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "./useComments";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useUser } from "../auth/useUser";
import { useGetUsers } from "../profile/useGetUsers";
import { timeAgo } from "../../utils/convertDate";
import { GoPencil, GoTrash } from "react-icons/go";

function Comments({ postId }) {
  const { comments, isLoading: commentsLoading } = useGetComments(postId);
  const { createNewComment, isLoading: createCommentLoading } =
    useCreateComment();
  const [newComment, setNewComment] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const { user } = useUser();
  const { users } = useGetUsers();
  const { deleteExistingComment, isLoading: deleteCommentLoading } =
    useDeleteComment();
  const { updateExistingComment, isLoading: updateCommentLoading } =
    useUpdateComment();

  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createNewComment({
        post_id: postId,
        user_id: user?.id,
        comment: newComment,
      });
      setNewComment("");
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  const handleDeleteComment = async (commentId) => {
    deleteExistingComment(commentId);
  };

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleUpdateComment = async (commentId) => {
    if (editCommentText.trim()) {
      updateExistingComment({ id: commentId, comment: editCommentText });
      setEditCommentText("");
      setEditingCommentId(null);
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  if (
    commentsLoading ||
    createCommentLoading ||
    deleteCommentLoading ||
    updateCommentLoading ||
    users.isLoading
  )
    return <div className="loader" />;

  return (
    <form onSubmit={handleAddComment}>
      <div className="flex max-w-3xl flex-col gap-2 divide-y divide-solid divide-gray-200 border-b border-gray-300 pb-2 text-gray-600">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2 pt-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2">
                <img
                  className="size-12 rounded-full"
                  src={
                    users?.data?.find((user) => user.id === comment.user_id)
                      ?.avatar_url
                  }
                  alt="Profile pic"
                />
                <div className="flex flex-col">
                  <h1>
                    {
                      users?.data?.find((user) => user.id === comment.user_id)
                        ?.full_name
                    }
                  </h1>
                  <span className="text-sm text-gray-400">
                    {timeAgo(comment.created_at)}
                  </span>
                </div>
              </div>
              {user?.id === comment.user_id && (
                <div className="flex flex-row gap-2 text-xl">
                  <button
                    type="button"
                    onClick={() =>
                      handleEditComment(comment.id, comment.comment)
                    }
                  >
                    <GoPencil />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <GoTrash />
                  </button>
                </div>
              )}
            </div>
            {editingCommentId === comment.id ? (
              <div className="flex flex-row gap-2 pt-2">
                <textarea
                  type="text"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-teal-400"
                  placeholder="Edit your comment..."
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  rows={1}
                />
                <Button
                  color="teal"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateComment(comment.id);
                  }}
                >
                  Update
                </Button>
              </div>
            ) : (
              <p className="break-words text-sm text-gray-600 sm:text-base">
                {comment.comment}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 pt-2">
        <textarea
          type="text"
          className="w-full rounded-lg border border-gray-300 p-3 outline-teal-400"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={1}
        />
        <Button color="teal" onClick={handleAddComment}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default Comments;
