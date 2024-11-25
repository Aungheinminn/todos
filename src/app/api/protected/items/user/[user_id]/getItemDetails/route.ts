import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const currentDate = searchParams.get("currentDate");
  if (!currentDate) {
    return NextResponse.json(
      { error: "Current Date is required" },
      { status: 400 },
    );
  }
  const current = new Date(currentDate);
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  console.log(current, tomorrow);
  const { user_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const item = await db.collection("items").findOne({
      user_id: user_id,
      createdAt: {
        $gte: current,
        $lt: tomorrow,
      },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    const plan = await db
      .collection("plans")
      .findOne({ _id: ObjectId.createFromHexString(item.plan) });
    const routines = await db
      .collection("routines")
      .find({
        _id: {
          $in: item.routines.map((r: string) =>
            ObjectId.createFromHexString(r),
          ),
        },
      })
      .toArray();
    item.plan = plan;
    item.routines = routines;

    return NextResponse.json(
      { message: "Item successfully fetched", data: item },
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
