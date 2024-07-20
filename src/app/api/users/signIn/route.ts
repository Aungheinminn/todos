import clientPromise from "@/lib/database";
import { decryptPassword } from "@/lib/hash.service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const password = searchParams.get('password');

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db('remarker_next');
        const user = await db.collection('users').findOne({ email: email});

        if(user){
            const comparePassword = await decryptPassword(password, user.password);
            const tokenData = {
                id: user._id,
                email: user.email,
                name: user.username
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
            if(comparePassword) {
                const response = NextResponse.json({ message: 'Login Successful', data: {
                    id: user._id,
                    name: user.username,
                    email: user.email,
                } }, { status: 200 });
                response.cookies.set('token', token, {
                    httpOnly: true,
                })

                return response;
            }
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}