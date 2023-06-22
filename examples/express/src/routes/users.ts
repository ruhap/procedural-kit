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
      id: z.number(),
    }),
    output: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),

    procedure: async (input) => {
      const user = await fakePrisma.findUnique({
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
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),
    output: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),
    procedure: async (input) => {
      const user = await fakePrisma.update({
        where: { id: input.id },
        data: { name: input.name, email: input.email },
      });
      return user;
    },
  })
  .delete({
    path: "/users/:id",
    input: z.object({
      id: z.number(),
    }),
    output: z.object({
      success: z.boolean(),
    }),
    procedure: async (input) => {
      const user = await fakePrisma.delete({
        where: { id: input.id },
      });
      return user;
    },
  })

  .build();
