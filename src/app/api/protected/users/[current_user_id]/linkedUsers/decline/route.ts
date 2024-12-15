import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
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
    if (declinedBy === "primary_user") {
      return NextResponse.json(
        {
          success: true,
          message: "Linking request is no longer existed",
          data: linkedUser,
        },
        { status: 200 },
      );
    } else {
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
