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

    let errorFlag = {
      flag: true,
      error: "",
    };

    for (const request of sharedWalletRequests) {
      const isRequestExisted = await db
        .collection("shared_wallet_requests")
        .findOne({
          wallet_id: request.wallet_id,
          inviter_id: request.inviter_id,
          invitee_id: request.invitee_id,
        });
      console.log(isRequestExisted);

      if (isRequestExisted) {
        console.log("it enters ise");
        errorFlag = {
          flag: false,
          error: "Request is already Existed",
        };
      }

      if (request.inviter_id === request.invitee_id) {
        console.log("it enters");
        errorFlag = {
          flag: false,
          error: "Can't Send request Yourself",
        };
      }

      const parsedBody = SharedWalletRequestSchema.parse(request);

      await db.collection("shared_wallet_requests").insertOne(parsedBody);
    }
    if (!errorFlag.flag) {
      return NextResponse.json(
        { success: false, error: errorFlag.error },
        { status: 404 },
      );
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
