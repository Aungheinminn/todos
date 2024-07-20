import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db('remarker_next');
        const items = await db.collection('items').insertOne(body);

        return NextResponse.json({ items }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const items = await db.collection('items').find().toArray();

        return NextResponse.json({ items }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

