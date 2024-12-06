import clientPromise from "@/lib/database";
import { LinkedUserSchema } from "@/lib/models/LinkedUser.model";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";
import { global } from "styled-jsx/css";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      current_user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { current_user_id } = params;
  const body = await req.json();
  // const linkedUserData = LinkedUserSchema.parse(body);
  const linkedUserData = body;
  console.log("linkedUserData", linkedUserData);
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const user = await db.collection("users").findOne({
      email: linkedUserData.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User is not existed",
        },
        { status: 404 },
      );
    }

    if(user._id.toString() === current_user_id){
      return NextResponse.json(
        {
          message: "You cannot add yourself",
        },
        { status: 404 },
      );
    }

    const data = {
      user_id: current_user_id,
      linked_user_id: user._id,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const findLinkedUser = await db
      .collection("linked_users")
      .findOne({ user_id: current_user_id, linked_user_id: user._id });

    if (findLinkedUser) {
      if (findLinkedUser.status === "accepted") {
        return NextResponse.json(
          {
            message: "You have been linked with this user",
          },
          { status: 404 },
        );
      } else if (findLinkedUser.status === "pending") {
        return NextResponse.json(
          {
            message: "You have sent a request to this user",
          },
          { status: 404 },
        );
      }
    }

    const linkedUser = await db.collection("linked_users").insertOne(data);
    console.log("linkedUser", linkedUser);

    const res = await db
      .collection("linked_users")
      .findOne({ _id: linkedUser.insertedId });

    console.log("res", res, res?.linked_user_id.toString());
    if (res) {
      const io = (global as any).io;
      io.to(res.linked_user_id.toString()).emit("notification", {
        content: {
          message: "You have been requested to add a user",
          type: "success",
        },
        from: current_user_id,
        to: res.linked_user_id.toString(),
      });
      return NextResponse.json(
        {
          success: true,
          message: "User successfully added",
          data: res,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      current_user_id: string;
    };
  },
) => {
  if (!params) {
    return NextResponse.json({ error: "User Id is required" }, { status: 500 });
  }
  const { current_user_id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const addedUsers = await db
      .collection("linked_users")
      .find({ user_id: current_user_id })
      .toArray();
    if (!addedUsers) {
      return NextResponse.json(
        { message: "No Linked users are found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Linked Users are successfully fetched", data: addedUsers },
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
