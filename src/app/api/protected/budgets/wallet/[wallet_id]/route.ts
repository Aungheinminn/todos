import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
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
    const findSameBudgetExist = await db.collection("budgets").findOne({
      user_id: parsedBody.user_id,
      wallet_id: parsedBody.wallet_id,
      budget: parsedBody.budget,
      category: parsedBody.category,
      // start_date: {
      //   $eq: new Date(parsedBody.start_date),
      // },
      // end_date: {
      //   $eq: new Date(parsedBody.end_date),
      // },
    });

    if (
      findSameBudgetExist &&
      findSameBudgetExist.start_date === parsedBody.start_date &&
      findSameBudgetExist.end_date === parsedBody.end_date
    ) {
      console.log(findSameBudgetExist);
      return NextResponse.json(
        { success: false, error: "Budget already exists" },
        {
          status: 400,
        },
      );
    }
    const budget = await db.collection("budgets").insertOne({
      ...parsedBody,
      created_at: new Date(),
      status: "active",
    });

    if (!budget) {
      return NextResponse.json(
        { success: false, error: "Error creating budget" },
        {
          status: 400,
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
