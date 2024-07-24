import clientPromise from "@/lib/database";
import { RoutineSchema } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const routineData = RoutineSchema.parse(body);

        const client = await clientPromise;
        const db = client.db('remarker_next');

        await db.collection('routines').insertOne(routineData);
        const routine = await db.collection('routines').findOne({ name: routineData.name });
        if(routine){
            return NextResponse.json({ message: 'Routine successfully created', data: routine }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to create routine' }, { status: 400 });
        }
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}