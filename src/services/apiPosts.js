import supabase from "./supabase";

export async function getPosts(page, limit) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    throw new Error("Posts could not be loaded");
  }
  return { data, error };
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Post not found");
  }
  return data;
}
export async function getPostsByUser(userId) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Post not found");
  }
  return data;
}
export async function createPost(obj) {
  const { data, error } = await supabase.from("posts").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("Post could not be created");
  }
  return data;
}
export async function updatePost(id, obj) {
  const { data, error } = await supabase
    .from("posts")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Post could not be updated");
  }
  return data;
}
export async function deletePost(id) {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Post could not be deleted");
  }
  return data;
}
