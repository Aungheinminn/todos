import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { TransactionSchmea } from "@/lib/models/transaction.model";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string; transaction_id: string } },
) => {
  if (!params.wallet_id || !params.transaction_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id, transaction_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transaction_id), wallet_id: wallet_id });
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
  { params }: { params: { wallet_id: string; transaction_id: string } },
) => {
  if (!params.wallet_id || !params.transaction_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id, transaction_id } = params;
  const body = await req.json();
  const parsedBody = TransactionSchmea.parse(body);
  const { _id, ...rest } = parsedBody;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(transaction_id) }, { $set: rest });

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Error updating transaction" },
        { status: 404 },
      );
    }
    const updatedTransaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transaction_id), wallet_id: wallet_id });

    return NextResponse.json(
      { success: true, data: updatedTransaction },
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string; transaction_id: string } },
) => {
  if (!params.wallet_id || !params.transaction_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id, transaction_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(transaction_id), wallet_id: wallet_id });

    if (!transaction) {
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
