import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Define a type for the decoded token data
type DecodedToken = {
    [key: string]: any; // Adjust this type as needed
};

const auth = (handler: (req: NextRequest) => Promise<any>) => {
    return async (req: NextRequest) => {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as DecodedToken;
            (req as any).decodedData = decoded;
            return handler(req);
        } catch (err) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }
    };
};

export default auth;

