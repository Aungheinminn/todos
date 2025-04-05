import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      ref_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json(
      { success: false, error: "ref_id is required" },
      { status: 400 },
    );
  }

  try {
    const { ref_id } = params;

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const user = await db.collection("users").findOne({
      refId: ref_id,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
};
