import jwt from "jsonwebtoken";
import { appEnv } from "./env";

export function generateToken(payload: object) {
  return jwt.sign(payload, appEnv.JWT_TOKEN_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, appEnv.JWT_TOKEN_SECRET);
}
