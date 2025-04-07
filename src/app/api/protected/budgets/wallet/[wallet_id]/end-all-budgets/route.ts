import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const now = new Date().toISOString();

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const updatedBudgets = await db
      .collection("budgets")
      .updateMany(
        { wallet_id: params.wallet_id, end_date: { $lt: now } },
        { $set: { status: "ended" } },
      );

    if (!updatedBudgets) {
      return NextResponse.json(
        { success: false, error: "Error ending budgets" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBudgets },
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
