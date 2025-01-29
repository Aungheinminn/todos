import clientPromise from "@/lib/database";
import { WalletSchema } from "@/lib/models/wallet.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const wallets = await db
      .collection("wallets")
      .find({ user_id: id })
      .toArray();

    if (!wallets) {
      return NextResponse.json(
        { success: false, message: "Wallet not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Wallet successfully fetched", data: wallets },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { id } = params;
  const body = await req.json();
  const parsedBody = WalletSchema.parse(body);

  const data = {
    ...parsedBody,
    createdAt: new Date().toISOString(),
  };

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallets = await db
      .collection("wallets")
      .find({ user_id: id })
      .toArray();

    if (wallets.length > 5) {
      return NextResponse.json(
        { success: false, message: "You can only have 5 wallets" },
        { status: 400 },
      );
    }

    const currentWallet = await db
      .collection("wallets")
      .findOne({ current: true, user_id: id });
    if (!currentWallet) {
      const wallet = await db.collection("wallets").insertOne({
        ...data,
        current: true,
      });

      if (!wallet) {
        return NextResponse.json(
          { success: false, message: "Wallet not created" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { success: true, message: "Wallet successfully created", data: wallet },
        { status: 200 },
      );
    } else {
      const wallet = await db.collection("wallets").insertOne({
        ...data,
        current: false,
      });
      if (!wallet) {
        return NextResponse.json(
          { success: false, message: "Wallet not created" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { success: true, message: "Wallet successfully created", data: wallet },
        { status: 200 },
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
