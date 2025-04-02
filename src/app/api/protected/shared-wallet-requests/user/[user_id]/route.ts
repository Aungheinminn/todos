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
    return NextResponse.json(
      { success: false, error: "request_id is required" },
      { status: 400 },
    );
  }
  try {
    const { user_id } = params;

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const sharedWalletRequests = await db
      .collection("shared_wallet_requests")
      .find({ $or: [{ inviter_id: user_id }, { invitee_id: user_id }] })
      .toArray();

    if (!sharedWalletRequests) {
      return NextResponse.json(
        { success: false, error: "Error deleting request" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: sharedWalletRequests },
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
