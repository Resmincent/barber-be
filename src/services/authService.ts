import * as userModel from "../models/userModel";
import { HttpError } from "../utils/error";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string) {
  const user = await userModel.getUserByEmail(email);
  if (!user) throw new HttpError("User not found", 404);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new HttpError("Invalid Error", 401);

  const token = generateToken({ id: user.id, email: user.email });

  return {
    username: user.username,
    role: user.role,
    token,
  };
}

export async function verifyTokenAndUser(token: string) {
  try {
    const { id } = verifyToken(token) as { id: string };

    const user = await userModel.getUserById(id);
    if (!user) {
      throw new HttpError("User Not Found", 401);
    }

    return user;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new HttpError("Invalid token", 401);
    }

    throw err;
  }
}
