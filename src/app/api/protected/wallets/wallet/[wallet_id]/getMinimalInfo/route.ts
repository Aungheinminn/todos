import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
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
    NextResponse.json(
      {
        success: false,
        message: "Wallet Id is required",
      },
      { status: 400 },
    );
  }

  try {
    const { wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("todos");
    const wallet = await db
      .collection("wallets")
      .findOne({ _id: new ObjectId(wallet_id) });
    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      data: {
        _id: wallet._id,
        name: wallet.wallet_name,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
