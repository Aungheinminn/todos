import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { BudgetSchema } from "@/lib/models/budget.model";
import { z, ZodError } from "zod";

export const GET = async (
  req: NextRequest,
  { params }: { params: { budget_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  try {
    const { budget_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const budget = await db
      .collection("budgets")
      .findOne({ _id: new ObjectId(budget_id) });

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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { budget_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const { budget_id } = params;
    const body = await req.json();

    const { _id, ...rest } = body;
    const parsedBody = BudgetSchema.parse(rest);

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const updatedBudget = await db
      .collection("budgets")
      .findOneAndUpdate(
        { _id: new ObjectId(budget_id) },
        { $set: parsedBody },
        { returnDocument: "after" },
      );

    if (!updatedBudget) {
      return NextResponse.json(
        { success: false, error: "Error updating budget" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedBudget });
  } catch (e) {
    console.error(e);
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { budget_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { budget_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const budget = await db
      .collection("budgets")
      .findOneAndDelete({ _id: new ObjectId(budget_id) });

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
