import { createClient } from "../../../../../lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(){

    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();
    if(error){
        return NextResponse.json({error:error.message},{status:500});
    }

    return NextResponse.json({message:"Successfully logged out"}, {status:200});
}