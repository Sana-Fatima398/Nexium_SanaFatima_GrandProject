import { createClient } from "../../../../../lib/supabase-server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { email } = await request.json();

   
    if (!email ) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
          options: {
            emailRedirectTo: 'http://localhost:3000/account/signup', 
        }
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Check your email for the magic link!" },{status: 200});   
}