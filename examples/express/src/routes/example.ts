import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";
import { loggerMiddleware } from "../middlewares";

export const exampleRouter = createRouter()
  .get({
    path: "/example",
    input: z.object({
      foo: z.string().optional(),
      poo: z.string().optional(),
    }),
    output: z.array(
      z.object({
        text: z.string(),
      })
    ),
    middlewares: [loggerMiddleware],
    procedure: (input) => {
      return [{ text: "Hello World" }, { text: "Hello World" }];
    },
  })
  .get({
    path: "/example/:name",
    input: z.object({ name: z.string() }),
    output: z.object({
      name: z.string(),
    }),
    procedure: async (input) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Error"));
          // resolve({ name: `Hello ${input.name}` });
        }, 1000);
      });
    },
  })
  .build();
