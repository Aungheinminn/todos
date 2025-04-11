import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

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
      { success: false, error: "request_id is required" },
      { status: 400 },
    );
  }
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const { user_id } = params;

    const client = await clientPromise;
    const db = client.db("remarker_next");

    const sharedWalletRequests = await db
      .collection("shared_wallet_requests")
      .aggregate([
        {
          $match: {
            [type as string]: user_id,
          },
        },
        {
          $addFields: {
            wallet_id: { $toObjectId: "$wallet_id" },
            inviter_id: { $toObjectId: "$inviter_id" },
            invitee_id: { $toObjectId: "$invitee_id" },
          },
        },
        {
          $lookup: {
            from: "wallets",
            localField: "wallet_id",
            foreignField: "_id",
            as: "wallet_data",
          },
        },
        {
          $unwind: "$wallet_data",
        },
        {
          $lookup: {
            from: "users",
            localField: "inviter_id",
            foreignField: "_id",
            as: "inviter_data",
          },
        },
        {
          $unwind: "$inviter_data",
        },
        {
          $lookup: {
            from: "users",
            localField: "invitee_id",
            foreignField: "_id",
            as: "invitee_data",
          },
        },
        {
          $unwind: "$invitee_data",
        },
        {
          $project: {
            _id: 1,
            status: 1,
            "wallet_data._id": 1,
            "wallet_data.wallet_name": 1,
            "inviter_data._id": 1,
            "inviter_data.username": 1,
            "inviter_data.email": 1,
            "invitee_data._id": 1,
            "invitee_data.username": 1,
            "invitee_data.email": 1,
          },
        },
      ])
      .toArray();

    if (!sharedWalletRequests) {
      return NextResponse.json(
        { success: false, error: "Error fetching request" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: sharedWalletRequests },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
