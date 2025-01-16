import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params.wallet_id) {
    return NextResponse.json({ status: 400 });
  }
  const { wallet_id } = params;
  const urlParams = new URL(req.url);
  const transaction_month = urlParams.searchParams.get("transaction_month");
  const transaction_year = urlParams.searchParams.get("transaction_year");

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transactions = await db
      .collection("transactions")
      .find({
        wallet_id: wallet_id,
        transaction_month: Number(transaction_month),
        transaction_year: Number(transaction_year),
      })
      .sort({ transaction_day: -1 })
      .toArray();

    if (!transactions) {
      return NextResponse.json(
        { success: false, error: "Transactions are not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transactions },
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
