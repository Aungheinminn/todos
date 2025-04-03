import { NextRequest, NextResponse } from "next/server";
// import jwt from 'jsonwebtoken';
import * as jose from "jose";
import { env } from "@/env";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token");
  console.log("token", token);

  if (!token?.value) {
    console.log("No token found in cookies");
    // return NextResponse.redirect('/login');
    // const modifiedUrl = req.url.replace("/api/protected/", "/");

    // return NextResponse.redirect(new URL('/api/users/signOut', modifiedUrl));
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("hi ur authorized", req.nextUrl.pathname);
  try {
    const secretKey = new TextEncoder().encode(env.JWT_SECRET ?? "");
    if (!secretKey) {
      console.log("JWT secret key is not set");
      return new NextResponse("Internal Server Error", { status: 500 });
    }

    const decoded = await jose.jwtVerify(token.value, secretKey);
    console.log("decoded", decoded);

    if (decoded) {
      return NextResponse.next();
    } else {
      return new NextResponse("Invalid Token", { status: 401 });
    }
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
