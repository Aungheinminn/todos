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
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const { shared_wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const body = await req.json();
    const { sharedWalletUser } = body;

    const currentWallet = await db.collection("wallets").findOneAndUpdate(
      { _id: new ObjectId(shared_wallet_id) },
      {
        $push: {
          shared_user_ids: sharedWalletUser,
        },
      },
      { returnDocument: "after" },
    );

    const updatedRequest = await db
      .collection("shared_wallet_requests")
      .updateOne(
        { wallet_id: shared_wallet_id },
        { $set: { status: "accepted" } },
      );

    console.log("blahblah", updatedRequest, currentWallet);

    if (!currentWallet || !updatedRequest) {
      return NextResponse.json(
        { success: false, error: "Error Updating Wallet" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: currentWallet },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
