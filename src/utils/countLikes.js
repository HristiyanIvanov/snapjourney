export function countLikes(postId, interactions) {
  return interactions.filter(interaction => interaction.post_id === postId && interaction.type === 'like').length;
}