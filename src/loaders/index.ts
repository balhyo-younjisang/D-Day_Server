import Logger from "./logger";
import serverLoader from "./server";
import dependencyInjector from "./dependencyInjector";
import { Application } from "express";

export default async ({ expressApp }: { expressApp: Application }) => {
  await dependencyInjector();

  await serverLoader({ app: expressApp });
  Logger.info("Express loaded");
};
