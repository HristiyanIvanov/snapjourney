import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username,
        avatar_url:
          "https://cfyajbqgaohqekcurmuz.supabase.co/storage/v1/object/public/avatars/no_picture.png",
        bio: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  const { user } = data;

  const { error: insertError } = await supabase.from("users").insert([
    {
      id: user.id,
      full_name: fullName,
      username,
      email,
      avatar_url:
        "https://cfyajbqgaohqekcurmuz.supabase.co/storage/v1/object/public/avatars/no_picture.png",
      bio: "",
    },
  ]);

  if (insertError) throw new Error("Failed to insert user into users table");

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function forgotPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);

  return data;
}

export async function resetPassword(accessToken, newPassword) {
  const { error } = await supabase.auth.updateUser(
    { password: newPassword },
    { access_token: accessToken },
  );

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
