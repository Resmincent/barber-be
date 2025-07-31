import * as authService from "../services/authService";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json({
    message: "Login successful",
    data: result,
  });
}
