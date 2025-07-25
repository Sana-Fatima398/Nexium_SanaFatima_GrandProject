import { NextResponse, NextRequest } from "next/server";
import connectMongo from "../../../../../lib/mongoose";
import Recipe from "../../../../../models/recipe";


export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    await connectMongo();

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  }catch (error) {
    return NextResponse.json({ error: "cant fetch recupe by id:Internal server error" }, { status: 500 });
  }
}