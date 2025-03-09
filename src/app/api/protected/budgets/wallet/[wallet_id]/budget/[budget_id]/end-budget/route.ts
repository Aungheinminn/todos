import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { wallet_id: string; budget_id: string };
  },
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

    const updatedBudget = await db
      .collection("budgets")
      .findOneAndUpdate(
        { _id: new ObjectId(budget_id), wallet_id: wallet_id },
        { $set: { status: "ended" } },
        { returnDocument: "after" },
      );

    if (!updatedBudget) {
      return NextResponse.json(
        { success: false, error: "Error ending budget" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBudget },
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
