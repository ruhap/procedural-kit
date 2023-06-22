import { Router } from "express";

import { exampleRouter } from "./example";
import { todoRouter } from "./todo";

export const routes = Router();

routes.use("/api", exampleRouter);
routes.use("/api", todoRouter);
