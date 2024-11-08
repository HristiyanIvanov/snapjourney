import { useQueryClient } from "@tanstack/react-query";
import { useCreateInteraction, useDeleteInteraction } from "./useInteractions";
import { useGetInteractions } from "./useGetInteractions";
import { useUser } from "../auth/useUser";
import { useGetPosts } from "./useGetPosts";
import { useCreateNotification } from "../notifications/useNotifications";

export function useInteraction() {
  const { user } = useUser();
  const { interactions } = useGetInteractions();
  const { createNewInteraction } = useCreateInteraction();
  const { deleteExistingInteraction } = useDeleteInteraction();
  const queryClient = useQueryClient();
  const { posts } = useGetPosts();
  const { createNewNotification } = useCreateNotification();

  const toggleInteraction = (postId, interactionType) => {
    const existingInteraction = interactions?.data.find(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === interactionType,
    );

    const userCreatedPost = posts?.data.find((post) => post.id === postId);

    if (existingInteraction) {
      deleteExistingInteraction(existingInteraction.id);
    } else {
      createNewInteraction({
        post_id: postId,
        user_id: user?.id,
        type: interactionType,
      });
      if (user?.id !== userCreatedPost?.user_id) {
        createNewNotification({
          type: interactionType,
          trigger_user_id: user?.id,
          target_user_id: userCreatedPost?.user_id,
          related_post_id: postId,
        });
      }

      const oppositeType = interactionType === "like" ? "dislike" : "like";
      const oppositeInteraction = interactions?.data.find(
        (interaction) =>
          interaction.post_id === postId &&
          interaction.user_id === user?.id &&
          interaction.type === oppositeType,
      );

      if (oppositeInteraction) {
        deleteExistingInteraction(oppositeInteraction.id);
      }
    }

    queryClient.invalidateQueries("posts");
    queryClient.invalidateQueries("interactions");
  };

  const isLiked = (postId) =>
    interactions?.data.some(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === "like",
    );

  const isDisliked = (postId) =>
    interactions?.data.some(
      (interaction) =>
        interaction.post_id === postId &&
        interaction.user_id === user?.id &&
        interaction.type === "dislike",
    );

  return { toggleInteraction, isLiked, isDisliked };
}
