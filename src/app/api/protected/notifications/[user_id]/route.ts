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
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { user_id } = params;
  try {
    const body = await req.json();
    const data = {
      ...body,
      created_at: new Date(),
    };
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const notification = await db.collection("notifications").insertOne(data);
    if (!notification) {
      return NextResponse.json(
        {
          message: "Notification is not created",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        message: "Notification is created",
        data: notification,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
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
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { user_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const notification = await db
      .collection("notifications")
      .find({ user_id })
      .toArray();
    if (!notification) {
      return NextResponse.json(
        {
	  success: false,
          message: "Notification are not fetched",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
	success: true,
        message: "Notification are fetched",
        data: notification,
      },
      { status: 200 },
    );
  } catch (e) {}
};
