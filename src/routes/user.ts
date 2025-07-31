import { Application, Router } from "express";
import * as authController from "../controllers/authController";
export default (app: Application) => {
  const router = Router();

  app.use("/auth", router);

  router.post("/login", authController.login);
};
