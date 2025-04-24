import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 },
    );
  }
  const { id } = params;

  const body = await req.json();
  const { wallet_id } = body;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    await db
      .collection("wallets")
      .updateMany({ user_id: id }, { $set: { current: false } });

    const wallets = await db
      .collection("wallets")
      .find({ user_id: id })
      .toArray();
    console.log(wallets, "wallets");

    await db
      .collection("wallets")
      .updateOne(
        { _id: ObjectId.createFromHexString(wallet_id) },
        { $set: { current: true } },
      );

    const currentWallet = await db
      .collection("wallets")
      .findOne({ _id: ObjectId.createFromHexString(wallet_id), current: true });

    if (!currentWallet) {
      return NextResponse.json(
        { success: false, error: "Error updating wallet" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Wallet updated successfully",
        data: currentWallet,
      },
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
