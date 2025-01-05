import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
      wallet_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 },
    );
  }
  const { id, wallet_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallet = await db
      .collection("wallets")
      .deleteOne({ _id: new ObjectId(wallet_id), user_id: new ObjectId(id) });

    if (!wallet) {
      return NextResponse.json(
        { success: false, message: "Wallet not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Wallet successfully deleted" },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 400 },
    );
  }
};
