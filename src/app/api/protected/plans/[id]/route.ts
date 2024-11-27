import clientPromise from "@/lib/database";
import { PlanSchema } from "@/lib/models/activePlan.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
  }

  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const plan = await db
      .collection("plans")
      .findOne({ _id: new ObjectId(id) });

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Plan successfully fetched", data: plan },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
  }
  const { id } = params;
  const reqBody = await new Response(req.body).json();

  const planData = PlanSchema.parse(reqBody);
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const plan = await db
      .collection("plans")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: planData },
        { returnDocument: "after" },
      );

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Plan successfully updated", data: plan },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
  }
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const areRoutinesExist = await db
      .collection("routines")
      .find({ plan_id: id })
      .toArray();

    if (areRoutinesExist.length !== 0) {
      console.log("routines", areRoutinesExist);
      return NextResponse.json(
        { message: "Delete routines first!" },
        { status: 404 },
      );
    }
    const plan = await db
      .collection("plans")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Plan successfully deleted", data: plan },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

