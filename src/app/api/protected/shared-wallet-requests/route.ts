import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
import { SharedWalletRequestSchema } from "@/lib/models/sharedWalletRequest.model";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { sharedWalletRequests } = body;

    const client = await clientPromise;
    const db = client.db("remarker_next");

    for (const request in sharedWalletRequests) {
      const parsedBody = SharedWalletRequestSchema.parse(request);

      await db
	.collection("shared_wallet_requests")
	.insertOne(parsedBody);
    }

    return NextResponse.json(
      { success: true, data: "Requests are successfully sent" },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: e.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
