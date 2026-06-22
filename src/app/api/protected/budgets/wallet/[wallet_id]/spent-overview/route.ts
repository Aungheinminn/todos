import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "wallet_id is required" },
      { status: 400 },
    );
  }
  try {
    const { wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");

    const budgets = await db
      .collection("budgets")
      .aggregate([
        {
          $match: {
            wallet_id: wallet_id,
            status: "active",
          },
        },
        {
          $lookup: {
            from: "transactions",
            let: {
              category: "$category",
              start_date: "$start_date",
              end_date: "$end_date",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$category", "$$category"] },
                      { $gte: ["$created_at", "$$start_date"] },
                      { $lte: ["$created_at", "$$end_date"] },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$transaction" },
                },
              },
            ],
            as: "spent",
          },
        },
        {
          $addFields: {
            transactions: {
              $ifNull: [{ $arrayElemAt: ["$spent.total", 0] }, 0],
            },
          },
        },
        {
          $addFields: {
            percentage: {
              $cond: [
                { $gt: ["$budget", 0] },
                { $multiply: [{ $divide: ["$transactions", "$budget"] }, 100] },
                0,
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            wallet_id: 1,
            category: 1,
            budget: 1,
            start_date: 1,
            end_date: 1,
            status: 1,
            createdAt: 1,
            transactions: 1,
            percentage: 1,
          },
        },
        { $sort: { percentage: -1 } },
        { $limit: 3 },
      ])
      .toArray();

    return NextResponse.json({ success: true, data: budgets });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
