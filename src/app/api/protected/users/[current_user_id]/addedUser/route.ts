import clientPromise from "@/lib/database";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  params: {
    params: {
      current_user_id: string;
    };
  },
) => {
  const body = await req.json();
  const data = {
    ...body,
    created_at: new Date().toISOString(),
  };
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const addedUser = await db.collection("addedUsers").insertOne(data);

    const res = await db
      .collection("addedUsers")
      .findOne({ _id: addedUser.insertedId });

    if (res) {
      return NextResponse.json(
        {
          message: "User successfully added",
          data: res,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const GET = async (req:NextRequest, { params }: {
    params: {
        current_user_id: string;
    }
}) => {
    if(!params) {
        return NextResponse.json({ error: "User Id is required" }, { status: 500 })
    }
    const { current_user_id } = params;
    try{
	const client = await clientPromise;
	const db = client.db('remarker_next');
	const addedUsers = await db.collection('addedUsers').find({ user_id: current_user_id }).toArray();
	if(!addedUsers){
		return NextResponse.json({ message: "No added users are found" }, { status: 404 });
	}
	return NextResponse.json({ message: "Added Users are successfully fetched", data: addedUsers }, { status: 200 });
	}catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
