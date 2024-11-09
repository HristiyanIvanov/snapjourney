import supabase from "./supabase";

export async function getUsers() {
  let query = supabase.from("users").select("*");
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
  return { data, error };
}
export async function getUser(id) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("User not found");
  }

  return data;
}
export async function updateUser(id, obj) {
  const { data, error } = await supabase
    .from("users")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("User could not be updated");
  }
  return data;
}
export async function createUser(authUser, userData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: authUser.email,
    password: authUser.password,
  });

  if (authError) {
    console.error(authError);
    throw new Error("User could not be created in auth");
  }

  const { data, error } = await supabase.from("users").insert([
    {
      id: authData.user.id,
      username: userData.username,
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      email: authUser.email,
      bio: userData.bio,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created in users table");
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
}

export async function searchUsers(query) {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, username, avatar_url")
    .or(`full_name.ilike.%${query}%,username.ilike.%${query}%`);

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }

  return data;
}
export async function getFollowedUsers(currentUserId) {
  const { data: followedUsersData, error: followedUsersError } = await supabase
    .from("followers")
    .select("followed_id")
    .eq("follower_id", currentUserId);

  if (followedUsersError) {
    console.error(followedUsersError);
    throw new Error("Failed to fetch followed users");
  }

  if (!followedUsersData || followedUsersData.length === 0) {
    return [];
  }

  const followedUserIds = followedUsersData.map((item) => item.followed_id);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .in("id", followedUserIds);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch followed users' data");
  }

  return data;
}
