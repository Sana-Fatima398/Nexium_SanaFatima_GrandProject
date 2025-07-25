import { NextResponse } from "next/server";
import connectMongo from "../../../../../lib/mongoose";
import Recipe from "../../../../../models/recipe";

export async function POST(req: Request){
    try{
        await connectMongo();
        const { email } = await req.json();
        const recipes = await Recipe.find({email});
        return NextResponse.json(recipes, {status: 200});
    }
    catch(error){
        console.error("Error reaading recipes:", error);
        return NextResponse.json({ error: "Failed to read recipe" }, { status: 500 });
    }
}