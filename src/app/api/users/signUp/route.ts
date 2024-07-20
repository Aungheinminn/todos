import clientPromise from "@/lib/database";
import { encryptPassword } from "@/lib/hash.service";
import { UserSchema } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const userData = UserSchema.parse(body);

        const encryptedPassword = await encryptPassword(userData.password);
        userData.password = encryptedPassword;

        const client = await clientPromise;
        const db = client.db('remarker_next');
        await db.collection('users').insertOne(userData);

        return NextResponse.json({ message: 'User successfully created!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};