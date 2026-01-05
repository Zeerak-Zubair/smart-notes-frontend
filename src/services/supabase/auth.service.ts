import { supabase } from "../../supabase-client";


export async function signup({email, password}: {email: string, password: string}){
    return supabase.auth.signUp({
        email,
        password
    });
}

export async function signin({email, password}: {email: string, password: string}){
    return supabase.auth.signInWithPassword({
        email,
        password
    });
}

export async function signout(){
    return supabase.auth.signOut();
}

export async function getSession() {
    return supabase.auth.getSession();
}