import clientPromise from "@/lib/database";
import { PlanSchema } from "@/lib/models/activePlan.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        const planData = PlanSchema.parse(body);

        const client = await clientPromise;
        const db = client.db('remarker_next');

        const plan = await db.collection("plans").insertOne(planData);
        const res = await db.collection("plans").findOne({ _id: plan.insertedId });
        if(res){
            return NextResponse.json({ message: "Active Plan successfully created", data: {
               _id: res._id,
               name: res.name,
               description: res.description ?? ''
            } }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to create a plan" }, { status: 400 });
        }

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');

        const plans = await db.collection('plans').find().toArray();
        if(plans){
            return NextResponse.json({ message: "Plans are successfully fetched", data: plans }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to fetch plans" }, { status: 400 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}