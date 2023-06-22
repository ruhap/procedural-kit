import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";
import { db } from "../database";

export const usersRouter = createRouter()
  .get({
    path: "/users",
    output: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      })
    ),
    procedure: async () => {
      const users = await db.user.findMany();
      return users;
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
      const user = await db.user.findUniqueOrThrow({
        where: { id: input.id },
      });
      return user;
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
      const user = await db.user.create({
        data: { name: input.name, email: input.email },
      });
      return user;
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
      const user = await db.user.update({
        where: { id: input.id },
        data: { name: input.name, email: input.email },
      });
      return user;
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
      const user = await db.user.delete({
        where: { id: input.id },
      });
      return user;
    },
  })

  .build();
