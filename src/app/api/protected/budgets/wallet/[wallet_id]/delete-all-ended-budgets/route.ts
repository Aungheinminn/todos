import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json(
      {
        success: false,
        error: "wallet_id is required",
      },
      { status: 400 },
    );
  }
  try {
    const { wallet_id } = params;
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const result = await db
      .collection("budgets")
      .deleteMany({ wallet_id: wallet_id, status: "ended" });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "No ended budgets found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
};
