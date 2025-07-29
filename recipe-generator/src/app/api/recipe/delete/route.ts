import connectMongo from "../../../../../lib/mongoose";
import Recipe from "../../../../../models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const { recipeId } = await request.json();

    if (!recipeId) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    await Recipe.findByIdAndDelete(recipeId);
    return NextResponse.json({ message: "Recipe deleted successfully" },{status:200});
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
