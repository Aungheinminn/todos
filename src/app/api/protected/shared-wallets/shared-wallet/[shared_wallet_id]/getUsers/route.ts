import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: { shared_wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "shared_wallet_id is required" },
      { status: 400 },
    );
  }

  try {
    const { shared_wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const users = await db
      .collection("wallets")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(shared_wallet_id),
          },
        },
        {
          $unwind: "$shared_user_ids",
        },
        {
          $addFields: { shared_user_ids: { $toObjectId: "$shared_user_ids" } },
        },
        {
          $lookup: {
            from: "users",
            localField: "shared_user_ids",
            foreignField: "_id",
            as: "shared_users",
          },
        },
        { $unwind: "$shared_users" },
				{ $group : {
					_id : "$shared_users._id",
					username : { $first : "$shared_users.username" },
					email : { $first : "$shared_users.email" },
					icon : { $first : "$shared_users.icon" },
					refId : { $first : "$shared_users.refId" },
				}},
      ])
      .toArray();

    if (!users) {
      return NextResponse.json(
        { success: false, error: "Error Fetching Users" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
