import supabase from './supabase'
 
 export async function getUsers() {    
     const TABLE_NAME = "users_details";
     const {data, error} = await supabase.from(TABLE_NAME).select('*');
     if (error) throw error;
     return data;
 }