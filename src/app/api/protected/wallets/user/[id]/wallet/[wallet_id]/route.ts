import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
      wallet_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 },
    );
  }
  const { id, wallet_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallet = await db
      .collection("wallets")
      .findOne({ _id: new ObjectId(wallet_id), user_id: id });

    if (!wallet) {
      return NextResponse.json(
        { success: false, message: "Wallet not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: wallet }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
      wallet_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 },
    );
  }
  const { id, wallet_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const isCurrentWallet = await db
      .collection("wallets")
      .findOne({ _id: new ObjectId(wallet_id), user_id: id, current: true });

    if (isCurrentWallet) {
      return NextResponse.json(
        { success: false, message: "Cannot delete current wallet" },
        { status: 400 },
      );
    }

    const wallet = await db
      .collection("wallets")
      .deleteOne({ _id: new ObjectId(wallet_id), user_id: id });

    const deleteRelatedTransactions = await db
      .collection("transactions")
      .deleteMany({ wallet_id: wallet_id });

    if (!wallet || !deleteRelatedTransactions) {
      return NextResponse.json(
        { success: false, message: "Error deleting wallet" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Wallet successfully deleted" },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 400 },
    );
  }
};
