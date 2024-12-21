import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      noti_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { noti_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const notification = await db
      .collection("notifications")
      .deleteOne({ _id: new ObjectId(noti_id) });
    if (!notification) {
      return NextResponse.json(
        { success: false, message: "Notification is not deleted" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: true, message: "Notification is deleted" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
