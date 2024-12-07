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
      .find({ user_id:user_id, status:"pending" })
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
