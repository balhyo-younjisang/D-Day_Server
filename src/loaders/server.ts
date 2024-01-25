import express from "express";
import cors from "cors";
import config from "../config";
import routes from "../api";
import helmet from "helmet";
import hpp from "hpp";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get(`${config.api.prefix}/status`, (req, res) => {
    res.status(200).end();
  });
  app.head(`${config.api.prefix}/status`, (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());
  app.use(hpp());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(config.api.prefix, routes());

  // 404 에러 캐치
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  // 에러 핸들러
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
