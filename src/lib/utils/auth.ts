import * as jose from "jose";
import { NextRequest } from "next/server";
import { env } from "@/env";

type JwtPayload = {
  id: string;
  email: string;
  name: string;
};

export const getUserFromRequest = async (
  req: NextRequest,
): Promise<JwtPayload | null> => {
  const token = req.cookies.get("token");
  if (!token?.value) return null;

  try {
    const secretKey = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token.value, secretKey);
    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    return { id: payload.id, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
};
