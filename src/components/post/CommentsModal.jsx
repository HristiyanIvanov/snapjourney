import { useState } from "react";
import { useGetComments } from "./useGetComments";
import { useCreateComment, useDeleteComment } from "./useComments";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useUser } from "../auth/useUser";
import { useGetUsers } from "../profile/useGetUsers";
import { timeAgo } from "../../utils/convertDate";
import { GoTrash } from "react-icons/go";
function Comments({ postId }) {
  const { comments, isLoading: commentsLoading } = useGetComments(postId);
  const { createNewComment, isLoading: createCommentLoading } =
    useCreateComment();
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();
  const { users } = useGetUsers();
  const { deleteExistingComment, isLoading: deleteCommentLoading } =
    useDeleteComment();
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

  if (
    commentsLoading ||
    createCommentLoading ||
    deleteCommentLoading ||
    users.isLoading
  )
    return <div className="loader" />;

  return (
    <form>
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
              <button
                type="button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <GoTrash />
              </button>
            </div>
            <p className="break-words text-sm text-gray-600 sm:text-base">
              {comment.comment}
            </p>
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
