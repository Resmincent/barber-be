import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/error";
import { verifyTokenAndUser } from "../services/authService";

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.get("authorization");

  if (!authorization) {
    throw new HttpError("Missing authorization header", 401);
  }

  const [type, token] = authorization.split(" ");

  if (type.toLowerCase() !== "bearer") {
    throw new HttpError("Invalid authorization token", 401);
  }

  const user = await verifyTokenAndUser(token);
  res.locals.user = user;

  next();
}

export async function isAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  if (!user || user.role !== "Admin") {
    throw new HttpError("Only admins can access this feature", 403);
  }

  next();
}

export async function isBarber(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  if (!user || user.role !== "Barber") {
    throw new HttpError("Only barbers can access this feature", 403);
  }

  next();
}
