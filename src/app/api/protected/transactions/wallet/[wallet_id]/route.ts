import { z } from "zod";
import clientPromise from "@/lib/database";
import { TransactionSchmea } from "@/lib/models/transaction.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params.wallet_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transactions = await db
      .collection("transactions")
      .find({ wallet_id: wallet_id })
      .toArray();

    if (!transactions) {
      return NextResponse.json(
        { success: false, error: "Wallet not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transactions },
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

export const POST = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params.wallet_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();
    const parsedBody = TransactionSchmea.parse(body);

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db
      .collection("transactions")
      .insertOne(parsedBody);

    const updatedWalletBalance = await db
      .collection("wallets")
      .findOneAndUpdate(
        { _id: new ObjectId(params.wallet_id) },
        { $inc: { balance: -parsedBody.transaction } },
        { returnDocument: "after" },
      );
    if (!transaction || !updatedWalletBalance) {
      return NextResponse.json(
        { success: false, error: "Error creating transaction" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transaction },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
