import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      current_user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { current_user_id } = params;
  const body = await req.json();
  const { primaryUserId, linkedUserId, declinedBy } = body;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const primary_user = await db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(primaryUserId) });
    const linked_user = await db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(linkedUserId) });

    const linkedUser = await db.collection("linked_users").findOneAndDelete({
      $or: [
        {
          "primary_user.id": primaryUserId,
          "linked_user.id": linkedUserId,
        },
        {
          "primary_user.id": primaryUserId,
          "linked_user.id": linkedUserId,
        },
      ],
    });
    console.log("linkedUser", linkedUser);
    if (!linkedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Linking users are not existed",
          data: linkedUser,
        },
        { status: 200 },
      );
    }

    await db.collection("notifications").deleteOne({
      type: "LINKING_ACCOUNT",
      "to.id": linkedUserId,
      "from.id": primaryUserId,
    });
    const io = (global as any).io;
    if (declinedBy === "primary_user") {
      const declineByPrimaryUser = {
        type: "LINKING_DECLINED",
        to: {
          id: linkedUserId,
          email: linked_user?.email,
          username: linked_user?.username,
        },
        from: {
          id: primaryUserId,
          email: primary_user?.email,
          username: primary_user?.username,
        },
        status: "declined",
        content: {
          message: `Linking has been declined by ${primary_user?.username}`,
        },
        last_seen: "",
      };
      const notification = await db.collection("notifications").insertOne(declineByPrimaryUser);
      io.to(linkedUserId).emit("linkingStatus", {
        message: "Linking has been deleted",
        status: "declined",
      });
      io.to(linkedUserId).emit("notifications", {
      _id: notification.insertedId,
        ...declineByPrimaryUser,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Linking request is no longer existed",
          data: linkedUser,
        },
        { status: 200 },
      );
    } else {
      const declineByLinkedUser = {
        type: "LINKING_DECLINED",
        to: {
          id: primaryUserId,
          email: primary_user?.email,
          username: primary_user?.username,
        },
        from: {
          id: linkedUserId,
          email: linked_user?.email,
          username: linked_user?.username,
        },
        status: "declined",
        content: {
          message: `Linking has been declined by ${linked_user?.username}`,
        },
        last_seen: "",
      };
      const notification = await db.collection("notifications").insertOne(declineByLinkedUser);
      io.to(primaryUserId).emit("linkingStatus", {
        message: "Linking has been declined",
        status: "declined",
      });
      io.to(primaryUserId).emit("notifications", {
        _id: notification.insertedId,
        ...declineByLinkedUser,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Linking request has been declined",
          data: linkedUser,
        },
        { status: 200 },
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
