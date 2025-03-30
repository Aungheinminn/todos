import clientPromise from "@/lib/database";
import { PushOperator } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      shared_wallet_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const { shared_wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarket_next");
    const body = await req.json();
    const { sharedWalletUser } = body;

    const currentWallet = await db
        .collection("wallets")
        .findOneAndUpdate({ wallet_id: shared_wallet_id }, {
          $push: {
            shared_user_ids: sharedWalletUser,
          },
        } as unknown as PushOperator<Document>);

    if (!currentWallet) {
      return NextResponse.json(
        { success: false, error: "Error Updating Transaction" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: currentWallet },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
