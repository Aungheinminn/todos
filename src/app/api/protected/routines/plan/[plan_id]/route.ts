import clientPromise from "@/lib/database";
import { RoutineSchema } from "@/lib/models/routine.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: { plan_id: string };
}) => {
    
    if(!params) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const { plan_id } = params    
    
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const plans = await db.collection('routines').find({ plan_id: plan_id }).toArray();
        
        if(!plans) {
            return NextResponse.json({ message: "No routines found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Routines are successfully fetched", data: plans }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }   
}


export const PUT = async (req: NextRequest, { params }: {
    params: {
        id: string;
    }
}) => {
    if(!params) {
        return NextResponse.json({ error: "Routine ID is required" }, { status: 400 });
    }

    const { id } = params;
    const routineData = RoutineSchema.parse(req.body);

    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const routine = await db.collection('routines').findOneAndUpdate(
            { _id: new ObjectId(id)},
            { $set: routineData },
            { returnDocument: 'after' }
        );

        if(!routine) {
            return NextResponse.json({ message: "Routine not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Routine successfully updated", data: routine }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

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
        const routine = await db.collection('routines').findOneAndDelete({ _id: new ObjectId(id) });

        if(!routine) {
            return NextResponse.json({ message: "Routine not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Routine successfully deleted", data: routine }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}