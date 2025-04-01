import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";

export const DELETE = async (req: NextRequest, { params }: { params: { request_id: string }}) => {
	if(!params) {
		return NextResponse.json(
			{ success: false, error: "request_id is required" },
			{ status: 400 },
		);
	}
	try {
		const { request_id } = params;
		const client = await clientPromise;
		const db = client.db("remarker_next");

		const deletedRequest = await db.collection("shared_wallet_requests").deleteOne({ _id: new ObjectId(request_id) });

		if(!deletedRequest) {
			return NextResponse.json(
				{ success: false, error: "Error deleting request" },
				{ status: 404 },
			);
		}
		return NextResponse.json(
			{ success: true, data: deletedRequest},
			{ status: 200 },
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ success: false, error: "Internal Server Error" },
			{ status: 500 },
		);
	}
};
