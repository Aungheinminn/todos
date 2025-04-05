import clientPromise from "@/lib/database";
import { decryptPassword } from "@/lib/services/hash.service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams, pathname } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("remarker_next");
    const user = await db.collection("users").findOne({ email: email });

    // if(!user) {
    //     console.log('a')
    // }

    if (user) {
      const comparePassword = await decryptPassword(password, user.password);
      const tokenData = {
        id: user._id,
        email: user.email,
        name: user.username,
      };
      const token = jwt.sign(tokenData, env.JWT_SECRET ?? "", {
        expiresIn: "1h",
      });
      if (comparePassword) {
        const response = NextResponse.json(
          {
            success: true,
            message: "Login Successful",
            data: {
              id: user._id,
              name: user.username,
              email: user.email,
            },
          },
          { status: 200 },
        );

        response.cookies.set("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000),
        });
        response.cookies.set(
          "user",
          JSON.stringify({
            id: user._id,
            name: user.username,
            email: user.email,
          }),
          {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000),
          },
        );
        return response;
      } else {
        return NextResponse.json(
          { success: false, error: "Incorrect Password" },
          { status: 404 },
        );
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
