import { supabase } from "../../supabase-client";

export async function createUser({
  name,
  avatar_url,
  email,
}: {
  name: string;
  avatar_url: string;
  email: string;
}) {
  return supabase.from("users").insert({
    name,
    avatar_url,
    email,
  });
}
