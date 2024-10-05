import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: {
    params: {
        id: string;
    }
}) => {
    if(!params) {
        return NextResponse.json({ error: "Routine ID is required" }, { status: 400 });
    }
    const { id } = params;
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const plan = await db.collection('routines').findOneAndDelete({ _id: new ObjectId(id) });

        if(!plan) {
            return NextResponse.json({ message: "Routine is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Routine is successfully deleted", data: plan }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}