import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string; budget_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  try {
    const { wallet_id, budget_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const budget = await db
      .collection("budgets")
      .findOne({ _id: new ObjectId(budget_id), wallet_id: wallet_id });

    if (!budget) {
      return NextResponse.json(
        { success: false, error: "Budget not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: budget });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Error getting budget" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string; budget_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id, budget_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const budget = await db
      .collection("budgets")
      .findOneAndDelete({ _id: new ObjectId(budget_id), wallet_id: wallet_id });

    if (!budget) {
      return NextResponse.json(
        { success: false, error: "Error deleting budget" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: budget }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
