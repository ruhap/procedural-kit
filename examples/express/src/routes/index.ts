import { Router } from "express";
import errorHandlerMiddleware from "@procedural-kit/adapters/express/errorHandlerMiddleware";

import { exampleRouter } from "./example";
import { todoRouter } from "./todo";

export const routes = Router();

routes.use("/api", exampleRouter);
routes.use("/api", todoRouter);

routes.use(errorHandlerMiddleware);
