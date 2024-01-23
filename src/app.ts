import express from "express";

import config from "./config";

import Loader from "./loaders";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  Loader({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      process.exit(1);
    });
}

startServer();
