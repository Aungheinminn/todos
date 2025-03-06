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
  const limit = urlParams.searchParams.get("limit");
  const transaction_month = urlParams.searchParams.get("transaction_month");
  const transaction_year = urlParams.searchParams.get("transaction_year");

  const startDate = new Date(
    Number(transaction_year),
    Number(transaction_month) - 1,
    1,
  );
  const endDate = new Date(
    Number(transaction_year),
    Number(transaction_month),
    0,
  );

  console.log("startDate", startDate, endDate);
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transactions = await db
      .collection("transactions")
      .find({
        wallet_id: wallet_id,
        created_at: {
          $gt: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      })
      .limit(Number(limit))
      .sort({ created_at: -1 })
      .toArray();

    console.log("transactions", transactions);

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
