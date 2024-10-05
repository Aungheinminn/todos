import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest, { params }: {
    params: {
        user_id: string;
    }
}) => {
    if(!params) {
        return NextResponse.json({ error: "User Id is required" }, { status: 500 })
    }
    const { user_id } = params;
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const routines = await db.collection('routines').find({ user_id: user_id}).toArray();

        if(!routines){
            return NextResponse.json({ message: "No routines are found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Routines are successfully fetched", data: routines }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}