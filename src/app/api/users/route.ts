import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database";
import { UserSchema } from "@/lib/models/user.model";
import { verify } from "crypto";
import { encryptPassword } from "@/lib/hash.service";


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



export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const users = await db.collection('users').find().toArray();

        return NextResponse.json({ users }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
