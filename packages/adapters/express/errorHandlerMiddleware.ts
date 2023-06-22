import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map((error) => error.message);
    console.error(err);
    res
      .status(400)
      .json({ error: "Validation Error", messages: errorMessages });
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandlerMiddleware;
