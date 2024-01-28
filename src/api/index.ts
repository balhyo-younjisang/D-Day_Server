import { Router } from "express";
import user from "./routes/user";
import config from "../config";
import diary from "./routes/diary";

export default () => {
  const app = Router();
  app.all(`${config.api.prefix}`);

  user(app);
  diary(app);

  return app;
};