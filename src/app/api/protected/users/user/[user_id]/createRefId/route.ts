import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
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
    const db = client.db("remarker_next");

    const user = await db.collection("users").findOne({
      _id: new ObjectId(user_id),
    });

    const updatedUser = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          ...user,
          refId: new ObjectId(),
        },
      },
    );

		if(!updatedUser) {
			return NextResponse.json({ success: false, error: "Error updating User"}, { status: 404})
		}

		return NextResponse.json({ success: true, data: updatedUser}, { status: 200})
  } catch (e) {

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
	}
};
