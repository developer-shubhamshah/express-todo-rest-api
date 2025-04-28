import type { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (Boom.isBoom(err)) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};