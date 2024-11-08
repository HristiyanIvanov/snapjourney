import { useState } from "react";
import { useGetComments } from "./useGetComments";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "./useComments";
import { useUser } from "../auth/useUser";
import { useGetUsers } from "../profile/useGetUsers";
import toast from "react-hot-toast";
import { useCreateNotification } from "../notifications/useNotifications";
export const useComment = (postId, posts) => {
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
  const { comments, isLoading: commentsLoading } = useGetComments(postId);
  const { createNewComment, isLoading: createCommentLoading } =
    useCreateComment();
  const [newComment, setNewComment] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const { user } = useUser();
  const { users } = useGetUsers();
  const { deleteExistingComment } = useDeleteComment();
  const { updateExistingComment } = useUpdateComment();
  const { createNewNotification } = useCreateNotification();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const userCreatedPost = posts?.data?.find(
    (post) => post.id === postId,
  )?.user_id;
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createNewComment({
        post_id: postId,
        user_id: user?.id,
        comment: newComment,
      });
      setNewComment("");
      if (user?.id !== userCreatedPost) {
        createNewNotification({
          type: "comment",
          trigger_user_id: user?.id,
          target_user_id: userCreatedPost,
          related_post_id: postId,
        });
      }
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

  const handleLoadMoreComments = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 5);
  };

  return {
    comments,
    visibleCommentsCount,
    commentsLoading,
    createCommentLoading,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    handleUpdateComment,
    handleLoadMoreComments,
    newComment,
    setNewComment,
    editCommentText,
    setEditCommentText,
    editingCommentId,
    setEditingCommentId,
    users,
    user,
  };
};
