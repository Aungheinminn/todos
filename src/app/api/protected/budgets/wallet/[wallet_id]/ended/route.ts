import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      {
        success: false,
        error: "wallet_id is required",
      },
      { status: 400 },
    );
  }

  try {
    const { wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const budgets = await db
      .collection("budgets")
      .find({ wallet_id: wallet_id, status: "ended" })
      .toArray();

    if (!budgets) {
      return NextResponse.json(
        { success: false, error: "Budget not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: budgets }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
