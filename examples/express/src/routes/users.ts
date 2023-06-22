import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";
import { db } from "../database";

export const usersRouter = createRouter()
  .get({
    path: "/users",
    input: z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      email: z.string().email().optional(),
    }),
    output: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      })
    ),
    procedure: async (input) => {
      return await db.user.findMany({ where: input });
    },
  })
  .get({
    path: "/users/:id",
    input: z.object({
      id: z.string(),
    }),
    output: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      return await db.user.findUniqueOrThrow({
        where: input,
      });
    },
  })
  .post({
    path: "/users",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    output: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      return await db.user.create({
        data: input,
      });
    },
  })
  .put({
    path: "/users/:id",
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    output: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      const { id, ...rest } = input;
      return await db.user.update({
        where: { id: input.id },
        data: rest,
      });
    },
  })
  .delete({
    path: "/users/:id",
    input: z.object({
      id: z.string(),
    }),
    output: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      return await db.user.delete({
        where: input,
      });
    },
  })

  .build();
