import { supabase } from "../../supabase-client";

export async function createProfile({
  name,
  avatar_url,
  email,
  user_id,
}: {
  name: string;
  avatar_url: string;
  email: string;
  user_id: string;
}) {
  return supabase.from("profile").insert({
    name,
    avatar_url,
    email,
    user_id
  });
}
