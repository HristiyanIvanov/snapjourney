import supabase from "./supabase";

export async function getNotifications() {
  let query = supabase.from("notifications").select("*");
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Notifications could not be loaded");
  }
  return { data, error };
}

export async function deleteNotification(id) {
  const { data, error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Notification could not be deleted");
  }
  return data;
}

export async function createNotification(obj) {
  const { data, error } = await supabase.from("notifications").insert(obj);
  if (error) {
    console.error(error);
    throw new Error("Notification could not be created");
  }
  return data;
}

export async function updateNotification(obj) {
  const { data, error } = await supabase
    .from("notifications")
    .update(obj)
    .eq("id", obj.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Notification could not be updated");
  }
  return data;
}

export async function getNotification(id) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Notification not found");
  }
  return data;
}
