import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

type QueryType = {
  user_id: string;
  name?: {
    $regex: string;
    $options: string;
  };
};

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { user_id: string };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { user_id } = params;
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get("search");

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const plans = await db
      .collection("plans")
      .find({
        user_id: user_id,
        ...(searchKey && { name: { $regex: searchKey, $options: "i" } }),
      })
      .sort({ _id: -1 })
      .toArray();

    if (!plans) {
      return NextResponse.json({ message: "No plans found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Plans are successfully fetched", data: plans },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
