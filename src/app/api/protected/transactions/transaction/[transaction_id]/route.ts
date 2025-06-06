import { z } from "zod";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { TransactionSchmea } from "@/lib/models/transaction.model";

export const GET = async (
  req: NextRequest,
  { params }: { params: { transaction_id: string } },
) => {
  if (!params.transaction_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { transaction_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transaction_id) });
    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Transaction not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transaction },
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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { transaction_id: string } },
) => {
  if (!params.transaction_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const { transaction_id } = params;
    const body = await req.json();

    const { _id, ...rest } = body;
    const parsedBody = TransactionSchmea.parse(rest);

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const currentTransaction = await db.collection("transactions").findOne({
      _id: new ObjectId(transaction_id),
    });

    if (!currentTransaction) {
      return NextResponse.json(
        { success: false, error: "Error updating transaction" },
        { status: 404 },
      );
    }

    const transaction = await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(transaction_id) }, { $set: parsedBody });

    const updatedWalletBalance = await db
      .collection("wallets")
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(currentTransaction.wallet_id) },
        {
          $inc: {
            balance: currentTransaction.transaction - parsedBody.transaction,
          },
        },
        { returnDocument: "after" },
      );

    if (!transaction || !updatedWalletBalance) {
      return NextResponse.json(
        { success: false, error: "Error updating transaction" },
        { status: 404 },
      );
    }
    const updatedTransaction = await db.collection("transactions").findOne({
      _id: new ObjectId(transaction_id),
    });

    return NextResponse.json(
      { success: true, data: updatedTransaction },
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { transaction_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { transaction_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const currentTransaction = await db.collection("transactions").findOne({
      _id: new ObjectId(transaction_id),
    });

    if (!currentTransaction) {
      return NextResponse.json(
        { success: false, error: "Error deleting transaction" },
        { status: 404 },
      );
    }

    const transaction = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(transaction_id) });

    const updatedWalletBalance = await db
      .collection("wallets")
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(currentTransaction.wallet_id) },
        {
          $inc: {
            balance:
              currentTransaction.category === "Other Income" ||
              currentTransaction.category === "Other Expense"
                ? -currentTransaction.transaction
                : currentTransaction.transaction,
          },
        },
        { returnDocument: "after" },
      );

    if (!transaction || !updatedWalletBalance) {
      return NextResponse.json(
        { success: false, error: "Error deleting transaction" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transaction },
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
