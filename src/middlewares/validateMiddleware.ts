import type { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'joi';
import Boom from '@hapi/boom';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        // Instead of sending response directly, throw a Boom error
        throw Boom.badRequest('Validation Failed', {
          details: error.details.map(err => err.message), // attach all error messages
        });
      } else {
        next();
      }
  };
};