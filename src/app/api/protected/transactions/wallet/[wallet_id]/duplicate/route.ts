import { z } from "zod";
import clientPromise from "@/lib/database";
import { TransactionSchmea } from "@/lib/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      wallet_id: string;
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
    const { wallet_id } = params;
    const body = await req.json();

    const { _id, ...rest } = body;
    const parsedBody = TransactionSchmea.parse(rest);

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const transaction = await db
      .collection("transactions")
      .insertOne(parsedBody);

    const updateWalletBalance = await db
      .collection("wallets")
      .findOneAndUpdate(
        { _id: new ObjectId(wallet_id) },
        { $inc: { balance: -parsedBody.transaction } },
        { returnDocument: "after" },
      );

    if (!transaction || !updateWalletBalance) {
      return NextResponse.json(
        { success: false, error: "Error Duplicating" },
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
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
