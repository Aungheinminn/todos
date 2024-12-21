import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";

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
      .find({
        "to.id": user_id,
        notiStatus: "new",
      })
      .toArray();
    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Notifications are not fetched",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "New notifications are fetched",
        data: notification,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
