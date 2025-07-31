import { Application } from "express";
import common from "./common";
import cors from "./cors";
import logger from "./logger";
import { Server } from "http";

export default (app: Application, _server: Server) => {
  common(app);
  cors(app);
  logger(app);
};
