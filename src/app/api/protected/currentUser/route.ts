import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const userData = req.cookies.get('user');

    if (!userData) {
        console.log('No user data found in cookies');
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const user = JSON.parse(userData.value);

        console.log('user', user);
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const currentUser = await db.collection('users').findOne(
            { email: user.email, username: user.name },
            { projection: { password: 0 } }
        );

        return NextResponse.json({ message: 'successfully get userdata', data: {
            currentUser
        }}, { status: 200 });

    } catch (e) {
        console.error(e)
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}

