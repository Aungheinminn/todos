import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { wallet_id: string } },
) => {
  if (!params) {
    return NextResponse.json({
      success: false,
      error: "wallet_id is required",
    });
  }
  try {
    const reqParams = new URL(req.url).searchParams;
    const startDate = reqParams.get("startDate");
    const endDate = reqParams.get("endDate");
    const client = await clientPromise;
    const db = client.db("remarker_next");
    // const transactions = await db.collection("transactions").find({
    // })
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
};
