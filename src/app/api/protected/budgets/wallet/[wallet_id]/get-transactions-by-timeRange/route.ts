import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json({
      success: false,
      error: "wallet_id is required",
    });
  }
  try {
    const { wallet_id } = params;

    const reqParams = new URL(req.url).searchParams;
    const category = reqParams.get("category");
    const startDate = reqParams.get("startDate");
    const endDate = reqParams.get("endDate");

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const transactions = await db
      .collection("transactions")
      .find({
        wallet_id: wallet_id,
        category: category,
        created_at: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .toArray();
    if (!transactions) {
      return NextResponse.json(
        {
          success: false,
          error: "Transactions not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: transactions,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
