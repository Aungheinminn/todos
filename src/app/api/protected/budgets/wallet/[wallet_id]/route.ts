import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";
import clientPromise from "@/lib/database";
import { BudgetSchema } from "@/lib/models/budget.model";
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
  if (!params.wallet_id) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  try {
    const body = await req.json();
    const parsedBody = BudgetSchema.parse(body);
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const budget = await db.collection("budgets").insertOne(parsedBody);

    if (!budget) {
      return NextResponse.json(
        { success: false, error: "Error creating budget" },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      { success: true, data: budget },
      {
        status: 200,
      },
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        {
          status: 400,
        },
      );
    }
    console.log(e);
    NextResponse.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
};
