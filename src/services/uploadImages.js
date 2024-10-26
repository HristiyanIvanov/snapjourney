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
