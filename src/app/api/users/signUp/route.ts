import clientPromise from "@/lib/database";
import { encryptPassword } from "@/lib/services/hash.service";
import { UserSchema } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const userData = UserSchema.parse(body);

    const encryptedPassword = await encryptPassword(userData.password);
    userData.password = encryptedPassword;

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const user = await db.collection("users").insertOne({
      ...userData,
      refId: new ObjectId(),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Error creating user" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, message: "User successfully created!" },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

