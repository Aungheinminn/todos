import clientPromise from "@/lib/database";
import { NotificationSchema } from "@/lib/models/notification.model";
import z from "zod";
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
  try {
    const body = await req.json();

    const parsedBody = NotificationSchema.parse(body);
    const data = {
      ...parsedBody,
      created_at: new Date(),
    };
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const notification = await db.collection("notifications").insertOne(data);
    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification is not created",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: notification,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 500 },
      );
    }
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
      .find({ $or: [ {"from.id": user_id}, {"to.id": user_id}] })
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
