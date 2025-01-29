import clientPromise from "@/lib/database";
import { TransactionSchmea } from "@/lib/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";

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
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  const { wallet_id } = params;
  const body = await req.json();
	const parsedBody = TransactionSchmea.parse(body);
  const { _id, ...rest } = parsedBody;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const transaction = await db.collection("transactions").insertOne(rest);
    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Error Duplicating" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: transaction },
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
