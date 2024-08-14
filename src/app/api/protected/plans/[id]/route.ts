import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest ,{ params }: {
    params: {
        id: string;
    }
}) => {

    if(!params) {
        return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    const { id } = params

    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const plan = await db.collection('plans').findOne({ _id: new ObjectId(id) });

        if(!plan) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Plan successfully fetched", data: plan }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}