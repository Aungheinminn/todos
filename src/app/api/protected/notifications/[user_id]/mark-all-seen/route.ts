import clientPromise from "@/lib/database";
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
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { user_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    // const a = await db
    //   .collection("notifications")
    //   .updateMany({ user_id: user_id }, { $set: { status: "seen" } });
    //
    // const notifications = await db
    //   .collection("notifications")
    //   .find({ user_id: user_id })
    //   .toArray();
    const pendingNotifications = await db
      .collection("notifications")
      .find({
        "to.id": user_id,
        $or: [{ status: "pending" }, { status: "new" }],
      })
      .toArray();

    if (pendingNotifications.length > 0) {
      await db
        .collection("notifications")
        .aggregate([
          {
            $match: { "to.id": user_id },
          },
          {
            $set: { status: "seen", last_seen: new Date() },
          },
          {
            $merge: {
              into: "notifications",
              whenMatched: "replace",
            },
          },
        ])
        .toArray();
    }
   const notifications = await db.collection("notifications")
      .find({
        "to.id": user_id,
      })
      .toArray();

    console.log("notifications", notifications);
    if (!notifications) {
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
        message: "Notifications are marked as seen",
        data: notifications,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
