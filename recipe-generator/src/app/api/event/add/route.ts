import connectMongo from "../../../../../lib/mongoose";
import Event from "../../../../../models/event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        await connectMongo();
        const {email, name, date, time, recipes} = await request.json();
        const newEvent = new Event({email,name,date,time,recipes})
        await newEvent.save();
       

        return NextResponse.json({message:"Event Saved Successfully"}, {status: 200});

    } catch(error){
        console.error("Error Saving Event", error);
        return NextResponse.json({ error: "Failed to save event" }, { status: 500 });
    
    }
}