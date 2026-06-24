import clientPromise from "@/lib/database";
import { getUserFromRequest } from "@/lib/utils/auth";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { user_id: string } },
) => {
  if (!params?.user_id) {
    return NextResponse.json(
      { success: false, error: "user_id is required" },
      { status: 400 },
    );
  }

  const jwtUser = await getUserFromRequest(req);
  if (!jwtUser) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  if (jwtUser.id !== params.user_id) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const newRefId = new ObjectId();

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(params.user_id) },
        { $set: { refId: newRefId } },
      );

    if (!result) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: newRefId },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
