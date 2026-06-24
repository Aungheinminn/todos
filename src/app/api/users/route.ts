import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/database";
import { SignUpInputSchema } from "@/lib/models/user.model";
import { encryptPassword } from "@/lib/services/hash.service";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const userData = SignUpInputSchema.parse(body);

    const encryptedPassword = await encryptPassword(userData.password);

    const client = await clientPromise;
    const db = client.db("remarker_next");
    await db.collection("users").insertOne({
      ...userData,
      password: encryptedPassword,
      refId: new ObjectId(),
    });

    return NextResponse.json(
      { message: "User successfully created!" },
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



