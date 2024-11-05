import { useComment } from "./useComment";
import Button from "../../ui/Button";
import { timeAgo } from "../../utils/convertDate";
import { GoPencil, GoTrash } from "react-icons/go";

function Comments({ postId }) {
  const {
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
    users,
    user,
  } = useComment(postId);

  if (commentsLoading || createCommentLoading)
    return <div className="loader" />;

  return (
    <div className="max-h-[75vh] overflow-y-auto">
      <form onSubmit={handleAddComment}>
        <div className="flex max-w-3xl flex-col gap-2 divide-y divide-solid divide-gray-200 border-b border-gray-300 pb-2 text-gray-600">
          {comments
            ?.slice(0, visibleCommentsCount)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
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
                          users?.data?.find(
                            (user) => user.id === comment.user_id,
                          )?.full_name
                        }
                      </h1>
                      <span className="text-sm text-gray-400">
                        {timeAgo(comment.created_at)}
                      </span>
                    </div>
                  </div>
                  {comment.user_id === user?.id && (
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
        {comments.length > visibleCommentsCount && (
          <div className="mt-2 text-center">
            <button onClick={handleLoadMoreComments}>Load More Comments</button>
          </div>
        )}
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
    </div>
  );
}

export default Comments;
