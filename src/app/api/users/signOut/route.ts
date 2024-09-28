import { NextResponse } from "next/server";

export const GET = async () => {
    const response = NextResponse.json({ success: true, data: 'Logout successfully!' })
    response.cookies.set('token', '')
    response.cookies.set('user', '')
    return response
}

