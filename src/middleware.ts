import { NextRequest, NextResponse } from "next/server";
export { auth } from "@/auth";
import * as jose from "jose";
import { env } from "@/env";


export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  if (!token?.value) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  try {
    const secretKey = new TextEncoder().encode(env.JWT_SECRET);
    await jose.jwtVerify(token.value, secretKey);
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return new NextResponse("Unauthorized", { status: 401 });
  }
};

export const config = {
  matcher: [
    "/((?!api|login|signup|unauthorized|redirect|_next/static|_next/image|favicon.ico).*)",
    "/api/protected/:path*",
  ],
};
