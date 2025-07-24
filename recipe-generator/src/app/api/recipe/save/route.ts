import connectMongo from "../../../../../lib/mongoose";
import Recipe from "../../../../../models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        await connectMongo();
        const { details, email} = await request.json();
        const newRecipe = new Recipe({details, email});
        await newRecipe.save();
        return NextResponse.json({message:"Recipe Saved Successfully"}, {status: 200});

    } catch(error){
        console.error("Error Saving Recipe", error);
        return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
    
    }
}