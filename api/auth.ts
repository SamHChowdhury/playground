"use server"

import db from "@/db/postgres";
import redis from "@/db/redis";
import { generateSalt, generateSessionId, hashPassword } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = "session-id"

interface AuthResponse {
    success: boolean;
    message: string;
}
interface Cookies {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

const createSessionCookie = async (user: {
    id: string;
    email: string;
    role: string;
    name: string;
}, cookie: Cookies) => {
    const sessionId = generateSessionId();
    await redis.set(`session:${sessionId}`, JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
    }), "EX", SESSION_EXPIRATION_SECONDS);
    cookie.set(COOKIE_SESSION_KEY, sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
    })
}

export const signIn = async (formData: FormData): Promise<AuthResponse> => {
    const email = (formData.get("email") as string).toLowerCase();
    const password = formData.get("password") as string;
    const user = await db.user.findUnique({
        where: { email },
    })
    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }
    const hashedPassword = await hashPassword(password, user.salt);
    if (hashedPassword !== user.password) {
        return {
            success: false,
            message: "Invalid password",
        };
    }
    await createSessionCookie(user, await cookies());
    return redirect("/dashboard");
}

export const signUp =async (formData: FormData): Promise<AuthResponse> => {
    const email = (formData.get("email") as string).toLowerCase();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    let user = await db.user.findUnique({
        where: { email },
    })
    if (user) {
        return {
            success: false,
            message: "User already exists",
        };
    }
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    user = await db.user.create({
        data: { email, password: hashedPassword, name, salt },
    });
    await createSessionCookie(user, await cookies());
    return redirect("/dashboard");
}

export const signOut = async () => {
    const cookie = await cookies();
    const sessionId = cookie.get(COOKIE_SESSION_KEY)?.value
    if (sessionId == null) return null
    await redis.del(`session:${sessionId}`)
    cookie.delete(COOKIE_SESSION_KEY)
    return redirect("/");
}

export const getSession = async () => {
    const cookie = await cookies();
    const sessionId = cookie.get(COOKIE_SESSION_KEY)?.value;
    if (!sessionId) return null;
    const sessionData = await redis.get(`session:${sessionId}`);
    if (!sessionData) return null;
    return JSON.parse(sessionData);
}