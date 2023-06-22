import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";

export const todoRouter = createRouter()
  .get({
    path: "/todos",
    output: z.object({
      id: z.string(),
      text: z.string(),
      value: z.boolean(),
    }),
    procedure: () => {
      return { id: "1", text: "wasd", value: false };
    },
  })
  .get({
    path: "/todos/:id",
    input: z.object({ id: z.string() }),
    output: z.object({
      id: z.string(),
      text: z.string(),
      value: z.boolean(),
    }),
    procedure: async (input) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: input.id, text: "", value: false });
        }, 2000);
      });
    },
  })
  .post({
    path: "/todos",
    input: z.object({ name: z.string() }),
    output: z.object({
      name: z.string(),
    }),
    procedure: async (input) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: input.name });
        }, 2000);
      });
    },
  })
  .build();
