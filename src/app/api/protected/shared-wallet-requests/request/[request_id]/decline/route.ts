import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { request_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "request_id is required" },
      { status: 400 },
    );
  }
  try {
    const { request_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const declinedRequest = await db
      .collection("shared_wallet_requests")
      .updateOne(
        { _id: new ObjectId(request_id) },
        { $set: { status: "declined" } },
      );
    if (!declinedRequest) {
      return NextResponse.json(
        { success: false, error: "Error declining request" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: declinedRequest },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
