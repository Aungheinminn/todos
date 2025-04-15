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
      { success: false, error: "user_id is required" },
      { status: 400 },
    );
  }

  try {
    const { user_id } = params;
    const client = await clientPromise;
    const db = client.db("remarket_next");

    const wallets = db
      .collection("wallets")
      .aggregate([
        {
          $match: {
            shared_user_ids: {
              $in: [user_id],
            },
          },
        },

      ])
  } catch (e) {
    console.error(e);
  }
};
