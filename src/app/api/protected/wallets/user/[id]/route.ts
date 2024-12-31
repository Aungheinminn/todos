import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  if (!params) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const { id } = params;

	try{
		const client = await clientPromise;
		const db = client.db("remarker_next");
		const wallets = await db.collection("wallets").find({ user_id: id }).toArray();

		if (!wallets) {
			return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ success: true, message: "Wallet successfully fetched", data: wallets },
			{ status: 200 },
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
};


export const POST = async ( req: NextRequest, { params }: { params: { id: string }} ) => {
	if (!params) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}
	const { id } = params;
	const body = await req.json();

	const data = {
		...body,
		createdAt: new Date().toISOString(),
	}

	try {
		const client = await clientPromise;
		const db = client.db("remarker_next");

		const wallet = await db.collection("wallets").insertOne(data);
		const res = await db.collection("wallets").findOne({ _id: wallet.insertedId });
		if(!res) {
			return NextResponse.json({ success: false, message: "Failed to create a wallet" }, { status: 400 });
		}

		return NextResponse.json(
			{ success: true, message: "Wallet successfully created", data: res },
			{ status: 200 },
		);
	}
	catch (e) {
		console.log(e);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}

};
