import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      shared_wallet_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 },
    );
  }
  try {
    const { shared_wallet_id } = params;
    const { user_id } = await req.json();


    const client = await clientPromise;
    const db = client.db("remarker_next");

    const updatedWallet = await db
      .collection("wallets")
      .findOneAndUpdate(
        { _id: new ObjectId(shared_wallet_id) },
        { $set: { user_id: user_id } },
        { returnDocument: "after" },
      );

    if (!updatedWallet) {
      return NextResponse.json(
        { success: false, error: "Error updating wallet" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedWallet },
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
