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
export async function createUser(obj) {
  const { data, error } = await supabase.from("users").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
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