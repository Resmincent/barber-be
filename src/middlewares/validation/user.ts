import { NextFunction, Response, Request } from "express";
import { generateJoiError } from "../../utils/helper";
import Joi from "joi";

const createUserScheme = Joi.object({
  usename: Joi.string().min(3).max(50).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateUserScheme = Joi.object({
  usename: Joi.string().min(3).max(50).required(),
  image: Joi.string().uri(),
}).min(1);

export async function createUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await createUserScheme.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errorMessages = generateJoiError(error);
    res.status(400).json({ message: errorMessages });
  }
}

export async function updateUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await updateUserScheme.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
    const errorMessages = generateJoiError(error);
    res.status(400).json({ message: errorMessages });
  }
}
