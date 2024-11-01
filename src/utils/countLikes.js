export function countLikes(postId, interactions, type) {
  if (!interactions) return 0;
  return interactions.filter(
    (interaction) =>
      interaction.post_id === postId && interaction.type === type,
  ).length;
}
