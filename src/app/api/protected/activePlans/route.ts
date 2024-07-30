import clientPromise from "@/lib/database";
import { ActivePlanSchema } from "@/lib/models/activePlan.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        const planData = ActivePlanSchema.parse(body);

        const client = await clientPromise;
        const db = client.db('remarker_next');

        const plan = await db.collection("activePlans").insertOne(planData);
        const res = await db.collection("activePlans").findOne({ _id: plan.insertedId });
        if(res){
            return NextResponse.json({ message: "Active Plan successfully created", data: res }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to create active plan" }, { status: 400 });
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

        const plans = await db.collection('activePlans').find().toArray();
        if(plans){
            return NextResponse.json({ message: "Active Plans successfully fetched", data: plans }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to fetch active plans" }, { status: 400 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}