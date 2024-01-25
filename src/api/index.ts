import { Router } from "express";
import user from "./routes/user";
import config from "../config";

export default () => {
  const app = Router();
  app.all(`${config.api.prefix}`);

  user(app);

  return app;
};