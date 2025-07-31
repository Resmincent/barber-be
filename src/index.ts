import express from "express";
import { createServer } from "http";
import { appEnv } from "./utils/env";
import loaders from "./loaders/index";
import routes from "./routes/index";
import errorHandler from "./middlewares/error";

function main() {
  const app = express();
  const serverBE = createServer();
  const port = appEnv.PORT;

  loaders(app, serverBE);
  routes(app);
  errorHandler(app);

  serverBE.listen(port, () => {
    console.log(
      `Server running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
    console.log(`API Docs: http://localhost:${port}/docs`);
  });
}

main();
