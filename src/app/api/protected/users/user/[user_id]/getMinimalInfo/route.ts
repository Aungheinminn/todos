import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
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
    NextResponse.json(
      {
        success: false,
        message: "User Id is required",
      } f
      { status: 400 },
    );
  }

  try {
    const { user_id } = params;
    const client = await clientPromise;
    const db = client.db("todos");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        icon: user.icon,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
