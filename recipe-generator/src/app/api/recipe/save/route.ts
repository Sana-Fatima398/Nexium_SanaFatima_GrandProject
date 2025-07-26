import connectMongo from "../../../../../lib/mongoose";
import Recipe from "../../../../../models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        await connectMongo();
        const body = await request.json();
        const { email, prompt, name } = body;

        if (!email || !prompt || !name) {
        return NextResponse.json(
            { error: 'Missing required fields: email, prompt, or name' },
            { status: 400 }
        );
        }

        const recipe = await Recipe.create(body);

        return NextResponse.json({message:"Recipe Saved Successfully"}, {status: 200});

    } catch(error){
        console.error("Error Saving Recipe", error);
        return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
    
    }
}