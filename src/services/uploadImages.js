import supabase from "./supabase";

export async function uploadImage(file) {
  const fileName = file && `image-${Math.random()}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function uploadAvatar(file, oldAvatarId) {
  const oldAvatarFileName = `avatar-${oldAvatarId}`;

  if (oldAvatarId) {
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([oldAvatarFileName]);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  const fileName = file && `avatar-${Math.random()}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
