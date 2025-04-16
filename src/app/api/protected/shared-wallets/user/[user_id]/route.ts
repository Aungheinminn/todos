import clientPromise from "@/lib/database";
import { WalletSchema } from "@/lib/models/wallet.model";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "user_id is required" },
      { status: 400 },
    );
  }

  try {
    const { user_id } = params;

    console.log(user_id);
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallets = await db
      .collection("wallets")
      .aggregate([
        {
          $match: {
            shared_user_ids: {
              $in: [user_id],
            },
          },
        },
        { $unwind: "$shared_user_ids" },
        {
          $addFields: { shared_user_ids: { $toObjectId: "$shared_user_ids" } },
        },
        {
          $lookup: {
            from: "users",
            localField: "shared_user_ids",
            foreignField: "_id",
            as: "shared_user",
          },
        },
        {
          $project: {
            "shared_user._id": 0,
            "shared_user.password": 0,
            "shared_user.refId": 0,
          },
        },
        { $unwind: "$shared_user" },
        {
          $group: {
            _id: "$_id",
            wallet_name: { $first: "$wallet_name" },
            user_id: { $first: "$user_id" },
            created_at: { $first: "$created_at" },
            currency: { $first: "$currency" },
            balance: { $first: "$balance" },
            current: { $first: "$current" },
            shared_user_ids: { $addToSet: "$shared_user" },
          },
        },
      ])
      .toArray();

    return NextResponse.json({ success: true, data: wallets }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { user_id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { user_id } = params;
    const body = await req.json();
    const parsedBody = WalletSchema.parse(body);

    const data = {
      ...parsedBody,
      shared_user_ids: [user_id],
      created_at: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const wallets = await db
      .collection("wallets")
      .find({ user_id: user_id })
      .toArray();

    if (wallets.length > 5) {
      return NextResponse.json(
        { success: false, message: "You can only have 5 wallets" },
        { status: 400 },
      );
    }

    const currentWallet = await db
      .collection("wallets")
      .findOne({ current: true, user_id: user_id });

    let wallet;
    if (!currentWallet) {
      wallet = await db.collection("wallets").insertOne({
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
      wallet = await db.collection("wallets").insertOne({
        ...data,
        current: false,
      });
      if (!wallet) {
        return NextResponse.json(
          { success: false, message: "Wallet not created" },
          { status: 400 },
        );
      }

      await db.collection("transactions").insertOne({
        wallet_id: wallet.insertedId.toString(),
        transaction: data.balance,
        user_id: user_id,
        category: "Other Income",
        note: "Initial Balance",
        transaction_day: new Date().getDate(),
        transaction_month: new Date().getMonth() + 1,
        transaction_year: new Date().getFullYear(),
      });

      return NextResponse.json(
        { success: true, message: "Wallet successfully created", data: wallet },
        { status: 200 },
      );
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
