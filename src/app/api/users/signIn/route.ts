import clientPromise from "@/lib/database";
import { decryptPassword } from "@/lib/services/hash.service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }
    const { email, password } = parsed.data;

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const ok = await decryptPassword(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const tokenData = {
      id: user._id.toString(),
      email: user.email,
      name: user.username,
    };
    const token = jwt.sign(tokenData, env.JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successful",
        data: tokenData,
      },
      { status: 200 },
    );

    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 3600000),
    });
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
