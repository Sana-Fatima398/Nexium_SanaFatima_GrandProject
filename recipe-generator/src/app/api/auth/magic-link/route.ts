import { createClient } from "../../../../../lib/supabase";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = createClient();
    const { email, name, country } = await request.json();

    // Validate input
    if (!email || !name || !country) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new user with the magic link
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            data: {
                name,
                country,
            },
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Check your email for the magic link!" },{status: 200});   
}