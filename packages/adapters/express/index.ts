import z from "zod";
import { RequestHandler, Router } from "express";

type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;
type RequestMethod = "get" | "post" | "put" | "delete";

type Route<Input extends z.AnyZodObject, Output extends z.AnyZodObject> = {
  method: RequestMethod;
  path: string;
  input?: Input;
  output: Output;
  middlewares?: RequestHandler[];
  procedure: (input: z.infer<Input>) => MaybePromise<z.infer<Output>>;
};

export const createRouter = () => {
  const router: Router = Router();

  const addRoute = <
    Input extends z.AnyZodObject,
    Output extends z.AnyZodObject
  >(
    route: Route<Input, Output>
  ) => {
    const { method, path, input, output, middlewares, procedure } = route;

    const routeMiddlewares = middlewares || [];

    router[method](path, ...routeMiddlewares, async (req, res, next) => {
      try {
        const parsedInput = input
          ? await input.parseAsync({
              ...req.params,
              ...req.body,
              ...req.query,
            })
          : {};

        const result = await procedure(parsedInput);
        const validatedOutput = await output.parseAsync(result);

        res.status(200).json(validatedOutput);
      } catch (error) {
        next(error);
      }
    });
  };

  const api = {
    get<Input extends z.AnyZodObject, Output extends z.AnyZodObject>(
      route: Omit<Route<Input, Output>, "method">
    ) {
      addRoute({ method: "get", ...route });
      return api;
    },
    post<Input extends z.AnyZodObject, Output extends z.AnyZodObject>(
      route: Omit<Route<Input, Output>, "method">
    ) {
      addRoute({ method: "post", ...route });
      return api;
    },
    put<Input extends z.AnyZodObject, Output extends z.AnyZodObject>(
      route: Omit<Route<Input, Output>, "method">
    ) {
      addRoute({ method: "put", ...route });
      return api;
    },
    delete<Input extends z.AnyZodObject, Output extends z.AnyZodObject>(
      route: Omit<Route<Input, Output>, "method">
    ) {
      addRoute({ method: "delete", ...route });
      return api;
    },
    build() {
      return router;
    },
  };

  return api;
};
