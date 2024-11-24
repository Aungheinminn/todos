import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
    };
  }
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { user_id } = params;
  try {
    const body = await req.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const data = {
      ...body,
      createdAt: new Date(),
    };
    // check there is an item created today
    const existingItem = await db.collection("items").findOne({
      user_id: user_id,
      createdAt: { $gte: today },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: "Item is already posted today" },
        { status: 400 },
      );
    }

    const result = await db.collection("items").insertOne(data);

    return NextResponse.json({ result }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
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
  const { user_id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const items = await db
      .collection("items")
      .find({
        user_id: user_id,
      })
      .sort({ _id: -1 })
      .toArray();

    if (!items) {
      return NextResponse.json({ message: "No Items found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Items are successfully fetched", data: items },
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
