import express from "express";

import config from "./config";

import Loader from "./loaders";
import Logger from "./loaders/logger";
import 'reflect-metadata';

async function startServer() {
  const app = express();

  Loader({ expressApp: app });
  console.log(app.route('/user'));

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
}

startServer();
