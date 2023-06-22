import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";
import { loggerMiddleware } from "../middlewares";

export const exampleRouter = createRouter()
  .get({
    path: "/example",
    output: z.object({
      text: z.string(),
    }),
    middlewares: [loggerMiddleware],
    procedure: () => {
      return { text: "Hello World" };
    },
  })
  .get({
    path: "/example/:name",
    input: z.object({ name: z.string() }),
    output: z.object({
      name: z.string(),
    }),
    procedure: async (input) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: `Hello ${input.name}` });
        }, 1000);
      });
    },
  })
  .build();
