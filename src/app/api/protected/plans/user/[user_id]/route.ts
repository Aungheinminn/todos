import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: { user_id: string };
}) => {
    
    if(!params) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const { user_id } = params    
    
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const plans = await db.collection('plans').find({ user_id: user_id }).toArray();
        
        if(!plans) {
            return NextResponse.json({ message: "No plans found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Plans successfully fetched", data: plans }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }   
}