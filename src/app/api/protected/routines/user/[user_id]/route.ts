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
    const { searchParams } = new URL(req.url)
    const currentPlan = searchParams.get('current')    
    const searchKey = searchParams.get('search')

    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const routines = await db.collection('routines').find({ 
            user_id: user_id,
            ...(currentPlan !== 'all' && { plan_id: { $regex: currentPlan, $options: 'i'}}),
            ...(searchKey && { name: { $regex: searchKey, $options: 'i'}})
        }).sort({ _id: -1 }).toArray();

        if(!routines){
            return NextResponse.json({ message: "No routines are found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Routines are successfully fetched", data: routines }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}