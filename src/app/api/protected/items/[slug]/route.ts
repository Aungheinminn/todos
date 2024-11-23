import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (id: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("remarker_next");
    const result = await db.collection("items").deleteOne({ _id: id as any });

    return NextResponse.json({ result }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

