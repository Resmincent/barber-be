import bcrypt from "bcrypt";
import { HttpError } from "../utils/error";
import { appEnv } from "../utils/env";
import * as userModel from "../models/userModel";

export async function createUse(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(appEnv.BCRYPT_SALT)
  );

  const payload = {
    username,
    email,
    password: hashedPassword,
  };

  const data = await userModel.createUser(payload);
  return data;
}

export async function getUserByEmail(email: string) {
  return userModel.getUserByEmail(email);
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    image?: string;
  }
) {
  if (!id) throw new HttpError("Missing user ID", 400);

  const udpated = await userModel.updateUserById(id, data);

  if (!udpated) throw new HttpError("User not found or update failed", 404);

  return udpated;
}
