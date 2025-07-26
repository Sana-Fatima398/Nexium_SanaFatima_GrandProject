import { NextResponse } from "next/server";
import connectMongo from "../../../../../lib/mongoose";
import Event from "../../../../../models/event";

export async function POST(req: Request){
    try{
        await connectMongo();
        const { email } = await req.json();
        console.log(email);
        const events = await Event.find({email});
        return NextResponse.json(events, {status: 200});
    }
    catch(error){
        console.error("Error reaading events:", error);
        return NextResponse.json({ error: "Failed to read events" }, { status: 500 });
    }
}