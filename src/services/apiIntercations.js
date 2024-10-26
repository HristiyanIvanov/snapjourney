import supabase from "./supabase";

export async function getInteractions() {
  let query = supabase.from("interactions").select("*");
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Interactions could not be loaded");
  }
  return { data, error };
}
export async function getInteractionsByUser(userId) {
  const { data, error } = await supabase
    .from("interactions")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Interactions not found");
  }
  return data;
}
export async function getInteraction(id) {
  const { data, error } = await supabase
    .from("interactions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Interaction not found");
  }
  return data;
}
export async function getInteractionsByPost(postId) {
  const { data, error } = await supabase
    .from("interactions")
    .select("*")
    .eq("post_id", postId);
  if (error) {
    console.error(error);
    throw new Error("Interactions not found");
  }
  return data;
}
export async function getInteractionByUserOnPost(userId, postId) {
  const { data, error } = await supabase
    .from("interactions")
    .select("*")
    .eq("user_id", userId)
    .eq("post_id", postId);
  if (error) {
    console.error(error);
    throw new Error("Interaction not found");
  }
  return data;
}
export async function updateInteraction(id, obj) {
  const { data, error } = await supabase
    .from("interactions")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Interaction could not be updated");
  }
  return data;
}
export async function createInteraction(obj) {
  const { data, error } = await supabase.from("interactions").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("Interaction could not be created");
  }
  return data;
}
export async function deleteInteraction(id) {
  const { data, error } = await supabase.from("interactions").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Interaction could not be deleted");
  }
  return data;
}
