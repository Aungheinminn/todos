import clientPromise from "@/lib/database";
import { getUserFromRequest } from "@/lib/utils/auth";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const jwtUser = await getUserFromRequest(req);
  if (!jwtUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const currentUser = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(jwtUser.id) },
        { projection: { password: 0 } },
      );

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(
      {
        message: "successfully get userdata",
        data: { currentUser },
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
