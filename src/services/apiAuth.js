import supabase from "./supabase";

export async function signup({ firstName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUser({ firstName, avatar }) {
  let avatarUrl;

  if (avatar && avatar.length > 0) {
    const file = avatar[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `avatar-${Math.floor(Math.random() * 1e9)}.${fileExt}`;
    const filePath = fileName;

    const { data: avatarData, error: avatarError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (avatarError) throw new Error(`Upload failed: ${avatarError.message}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(avatarData.path);

    avatarUrl = publicUrl;
  }

  const updateData = {
    firstName,
  };

  if (avatarUrl) {
    updateData.avatar = avatarUrl;
  }

  const { data, error } = await supabase.auth.updateUser({
    data: updateData,
  });

  if (error) throw new Error(`Profile update failed: ${error.message}`);

  return data;
}

export async function updatePassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);
}
