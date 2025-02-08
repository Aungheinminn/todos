import { z } from "zod";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { WalletSchema } from "@/lib/models/wallet.model";

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

export const PUT = async (
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

  try {
    const { id, wallet_id } = params;
    const { _id, created_at, ...rest } = await req.json();
    console.log("rest", rest);
    const parsedBody = WalletSchema.parse(rest);

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallet = await db
      .collection("wallets")
      .findOne({ _id: new ObjectId(wallet_id), user_id: id });

    if (wallet?.balance !== parsedBody.balance) {
      await db.collection("transactions").insertOne({
        wallet_id: wallet_id,
        transaction: parsedBody.balance - wallet?.balance,
        user_id: id,
        category:
          parsedBody.balance - wallet?.balance > 0
            ? "Other Income"
            : "Other Expense",
        note: "Adjust Balance",
        transaction_day: new Date().getDate(),
        transaction_month: new Date().getMonth() + 1,
        transaction_year: new Date().getFullYear(),
      });
    }

    const updatedWallet = await db.collection("wallets").findOneAndUpdate(
      { _id: new ObjectId(wallet_id), user_id: id },
      {
        $set: {
          ...parsedBody,
          created_at: new Date(created_at),
        },
      },
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
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 400 },
      );
    }

    console.log(e);
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
