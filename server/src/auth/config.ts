// src/auth/config.ts

import dotenv from "dotenv";
dotenv.config();

/**
 * ✅ JWT & Bcrypt Config
 * These are centralized so `auth.routes.ts` stays clean and so
 * TypeScript knows these values exist.
 */

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "defaultsecret",
  expiresIn: process.env.JWT_EXPIRES_IN || "8h",
};

export const bcryptConfig = {
  saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};

/**
 * 🧪 Optional sanity check to ensure required env vars are set.
 * Call this in your app startup to fail fast if JWT_SECRET is missing.
 */
export const validateAuthConfig = () => {
  if (!jwtConfig.secret) {
    throw new Error("❌ Missing JWT_SECRET in environment variables.");
  }
};
