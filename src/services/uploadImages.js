import supabase from "./supabase";

export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const { publicURL, error: urlError } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  if (urlError) {
    throw new Error(urlError.message);
  }

  return publicURL;
}
