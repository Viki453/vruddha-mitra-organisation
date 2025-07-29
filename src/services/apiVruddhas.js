import supabase, { supabaseUrl } from "./supabase";

export async function getVruddhas({ tFilter, tSort, tPage }) {
  console.log(tFilter);
  console.log(tSort);
  console.log(tPage);
  let query = supabase.from("vruddhas").select("*", { count: "exact" });
  query = query.range(tPage * 10 - 10, tPage * 10 - 1);

  if (tFilter !== "all") query = query.eq("currentStatus", tFilter);

  const isAscending = tSort === "A-Z";
  query = query.order("firstName", { ascending: isAscending });

  const { data: vruddhas, error, count } = await query;

  if (error) {
    console.error(error.message);
  }
  console.log(vruddhas);
  return { vruddhas, count };
}

export async function addVruddha(vruddha) {
  let imagePath = vruddha.image;

  const isNewImage =
    vruddha.image && typeof vruddha.image !== "string" && vruddha.image.name;

  if (isNewImage) {
    const imageName = `${Math.random()}-${vruddha.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/vruddha-photos/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("vruddha-photos")
      .upload(imageName, vruddha.image);

    if (storageError) {
      console.log(storageError);
      throw new Error("Image upload failed");
    }
  }

  const { data, error } = await supabase
    .from("vruddhas")
    .insert([{ ...vruddha, image: imagePath }]);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteVruddha(id) {
  const { data, error } = await supabase.from("vruddhas").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Could not delete profile");
  }

  return data;
}

export async function createDuplicateVruddha({ vruddha }) {}

export async function getVruddha(id) {
  const { data, error } = await supabase
    .from("vruddhas")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Could not delete profile");
  }

  return data;
}

export async function editVruddha({ newVruddha, id }) {
  const hasImagePath = newVruddha.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newVruddha.image
    : `${Math.random()}-${newVruddha.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newVruddha.image
    : `${supabaseUrl}/storage/v1/object/public/vruddha-photos/${imageName}`;

  const { data, error } = await supabase
    .from("vruddhas")
    .update({ ...newVruddha, image: imagePath })
    .eq("id", id);

  if (error) throw new Error(error.message);

  console.log(data);

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("vruddha-photos")
    .upload(imageName, newVruddha.image);

  if (storageError) {
    console.log(storageError);
    throw new Error("Image upload failed");
  }
}
