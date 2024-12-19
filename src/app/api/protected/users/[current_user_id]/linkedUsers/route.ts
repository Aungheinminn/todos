import clientPromise from "@/lib/database";
// import { LinkedUserSchema } from "@/lib/models/LinkedUser.model";
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
  const client = await clientPromise;
  const db = client.db("remarker_next");
  try {
    const currentUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(current_user_id) });

    const user = await db.collection("users").findOne({
      email: linkedUserData.email,
    });

    if (!user || !currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not existed",
        },
        { status: 404 },
      );
    }
    // console.log("users", user, currentUser);

    if (user._id.toString() === current_user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot add yourself",
        },
        { status: 404 },
      );
    }

    const data = {
      primary_user: {
        id: currentUser._id.toString(),
        email: currentUser.email,
        username: currentUser.username,
      },
      linked_user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
      status: "pending",
      created_at: new Date().toISOString(),
    };
    console.log("data", data);

    const findLinkedUser = await db.collection("linked_users").findOne({
      $or: [
        {
          "primary_user.id": current_user_id,
          "linked_user.id": user._id.toString(),
        },
        {
          "primary_user.id": user._id.toString(),
          "linked_user.id": current_user_id,
        },
      ],
    });
    console.log("findLinkedUser", findLinkedUser);

    if (findLinkedUser) {
      if (findLinkedUser.status === "accepted") {
        return NextResponse.json(
          {
            success: false,
            message: "You have been linked with this user",
          },
          { status: 404 },
        );
      } else if (findLinkedUser.status === "pending") {
        return NextResponse.json(
          {
            success: false,
            message:
              findLinkedUser.user_id === current_user_id
                ? "You have sent a request to this user"
                : "You have a request from this user",
          },
          { status: 404 },
        );
      }
    }

    const linkedUser = await db.collection("linked_users").insertOne(data);
    console.log("linkedUser", linkedUser);

    //
    const res = await db
      .collection("linked_users")
      .findOne({ _id: linkedUser.insertedId });

    console.log("res", res);

    if (res) {
      const notiData = {
          type: "LINKING_ACCOUNT",
          to: {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          },
          from: {
            id: currentUser._id.toString(),
            email: currentUser.email,
            username: currentUser.username,
          },
          status: "pending",
          content: {
            message: `${currentUser.username} requested to link with you.`,
          }
      }
      const notification = await db.collection("notifications").insertOne({
        ...notiData,
        last_seen: "",
      });
      if (notification) {
        const io = (global as any).io;
        io.to(res.linked_user.id.toString()).emit("notifications", {
          ...notiData,
          last_seen: new Date()
        });

        io.to(res.linked_user.id.toString()).emit("linkingStatus", {
          message: "Linked user status updated",
          status: "accepted",
        });
      }
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

    const linkedUsers = await db
      .collection("linked_users")
      .find({
        $or: [
          {
            "primary_user.id": current_user_id,
          },
          {
            "linked_user.id": current_user_id,
          },
        ],
      })
      .toArray();
    console.log("linkedUsers", linkedUsers);
    if (!linkedUsers) {
      return NextResponse.json(
        { message: "No Linked users are found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Linked Users are successfully fetched", data: linkedUsers },
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
