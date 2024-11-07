import supabase from "./supabase";

export async function getFollowers() {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error("Followers could not be loaded");
  }
  return { data, error };
}

export async function getFollowersByUser(userId) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Followers not found");
  }
  return data;
}

export async function getFollowersByFollower(followerId) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", followerId);
  if (error) {
    console.error(error);
    throw new Error("Followers not found");
  }
  return data;
}

export async function getFollower(id) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Follower not found");
  }
  return data;
}

export async function createFollower(obj) {
  const { data, error } = await supabase.from("followers").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("Follower could not be created");
  }
  return data;
}

export async function updateFollower(id, obj) {
  const { data, error } = await supabase
    .from("followers")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Follower could not be updated");
  }
  return data;
}

export async function deleteFollower(followed_id) {
  const { data, error } = await supabase
    .from("followers")
    .delete()
    .eq("followed_id", followed_id);

  if (error) {
    console.error(error);
    throw new Error("Follower could not be deleted");
  }
  return data;
}
