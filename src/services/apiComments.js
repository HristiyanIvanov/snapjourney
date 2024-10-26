import supabase from "./supabase";

export async function getComments() {
  let query = supabase.from("comments").select("*");
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
  return { data, error };
}
export async function getCommentOnPostByUser(userId, postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Comment not found");
  }

  return data;
}
export async function getCommentsOnPost(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId);
  if (error) {
    console.error(error);
    throw new Error("Comments not found");
  }
  return data;
}
export async function getCommentsByUser(userId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Comments not found");
  }
  return data;
}
export async function getComment(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Comment not found");
  }
  return data;
}
export async function createComment(obj) {
  const { data, error } = await supabase.from("comments").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("Comment could not be created");
  }
  return data;
}
export async function updateComment(id, obj) {
  const { data, error } = await supabase
    .from("comments")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Comment could not be updated");
}
  return data;
}
export async function deleteComment(id) {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Comment could not be deleted");
  }
  return data;
}