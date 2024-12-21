import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (
  req: NextRequest,
  { params }: { params: { current_user_id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { current_user_id } = params;
  const body = await req.json();
  const { primaryUserId, linkedUserId, newStatus } = body;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const linkedUsers = await db.collection("linked_users").findOneAndUpdate(
      {
        $or: [
          {
            "primary_user.id": primaryUserId,
            "linked_user.id": linkedUserId,
          },
          {
            "primary_user.id": linkedUserId,
            "linked_user.id": primaryUserId,
          },
        ],
      },
      { $set: { status: newStatus } },
      { returnDocument: "after" },
    );
    if (!linkedUsers) {
      return NextResponse.json(
        { success: false, message: "Linked user not found" },
        { status: 404 },
      );
    }
    const currentNotification = await db
      .collection("notifications")
      .findOneAndUpdate(
        {
          "to.id": linkedUserId,
          "from.id": primaryUserId,
          type: "LINKING_ACCOUNT",
        },
        {
          $set: { status: "accepted" },
        },
        { returnDocument: "after" },
      );
    if (!currentNotification) {
      return NextResponse.json(
        { success: false, message: "Linked user not found" },
        { status: 404 },
      );
    }
    // reverse "to and from" as the notification is sent to the primary user
    const acceptedNotification = {
      type: "LINKING_ACCEPT",
      to: {
        id: currentNotification.from.id,
        email: currentNotification.from.email,
        username: currentNotification.from.username,
      },
      from: {
        id: currentNotification.from.id,
        email: currentNotification.from.email,
        username: currentNotification.from.username,
      },
      notiStatus: "new",
      status: "accepted",
      content: {
        message: `${currentNotification.to.username} accepted your linking request`,
      },
      last_seen: "",
    };

    const notification = await db.collection("notifications").insertOne(acceptedNotification);

    const io = (global as any).io;
    io.to(primaryUserId).emit("linkingStatus", {
      message: "Linked user status updated",
      notiStatus: "new",
      status: "accepted",
    });
    io.to(primaryUserId).emit("notifications", {
      _id: notification.insertedId,
      ...acceptedNotification,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Linked user status updated",
        data: linkedUsers,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
