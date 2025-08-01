import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import { HttpError } from "../utils/error";

export async function checkEmailIsExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body;
  const currentUser = res.locals.user;

  const skipUniqueCheckEmail = currentUser?.email === email;

  if (email && !skipUniqueCheckEmail) {
    const userEmail = await userService.getUserByEmail(email);
    if (userEmail) {
      throw new HttpError('User with the same email already exists!", 409');
    }
  }

  next();
}
