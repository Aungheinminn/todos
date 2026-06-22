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

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const transactions = await db
      .collection("transactions")
      .find({ wallet_id: wallet_id })
      .sort({ created_at: -1 })
      .limit(3)
      .toArray();

    return NextResponse.json(
      { success: true, data: transactions },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
};
