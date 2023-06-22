import z from "zod";
import { createRouter } from "@procedural-kit/adapters/express";
import { fakePrisma } from "../database";

export const usersRouter = createRouter()
  .get({
    path: "/users",
    output: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
      })
    ),
    procedure: async () => {
      const users = await fakePrisma.findMany({});
      return users;
    },
  })
  .get({
    path: "/users/:id",
    input: z.object({
      id: z.coerce.string(),
    }),
    output: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),

    procedure: async (input) => {
      const user = await fakePrisma.findUnique({
        where: { id: Number(input.id) },
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
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      const user = await fakePrisma.create({
        data: { name: input.name, email: input.email },
      });
      return user;
    },
  })
  .put({
    path: "/users/:id",
    input: z.object({
      id: z.coerce.string(),
      name: z.string(),
      email: z.string().email(),
    }),
    output: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      const user = await fakePrisma.create({
        data: { name: input.name, email: input.email },
      });
      return user;
    },
  })

  .build();
