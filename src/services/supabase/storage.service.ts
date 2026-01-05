import { supabase } from "../../supabase-client";

export async function uploadImage({
  file,
  bucket,
  userId,
}: {
  file: File;
  bucket: string;
  folder?: string;
  userId: string;
}) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath =  fileName;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { publicUrl, filePath };
}
