import clientPromise from "@/lib/database";
import { NextResponse } from "next/server";
export const GET = async (
  req: NextResponse,
	{ params }: {
    params: {
      user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { user_id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const items = await db
      .collection("items")
      .find({
        user_id: user_id,
      })
      .sort({ _id: -1 })
      .toArray();

    if (!items) {
      return NextResponse.json({ message: "No plans found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Plans are successfully fetched", data: items },
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
