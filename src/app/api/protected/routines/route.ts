import clientPromise from "@/lib/database";
import { RoutineSchema } from "@/lib/models/routine.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const routineData = RoutineSchema.parse(body);

    const data = {
      ...routineData,
      createdAt: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const routine = await db.collection("routines").insertOne(data);
    const res = await db
      .collection("routines")
      .findOne({ _id: routine.insertedId });
    if (res) {
      return NextResponse.json(
        {
          message: "Routine successfully created",
          data: {
            name: res.name,
            description: res.description ?? "",
            user_id: res.user_id,
            plan_id: res.plan_id,
            createdAt: res.createdAt,
          },
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { error: "Failed to create routine" },
        { status: 400 },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

