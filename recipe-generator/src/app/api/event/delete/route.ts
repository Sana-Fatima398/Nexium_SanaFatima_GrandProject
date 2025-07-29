import connectMongo from "../../../../../lib/mongoose";
import Event from "../../../../../models/event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    await Event.findByIdAndDelete(eventId);
    return NextResponse.json({ message: "Recipe deleted successfully" },{status:200});
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
