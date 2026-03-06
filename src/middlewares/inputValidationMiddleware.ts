import { type Request, type Response, type NextFunction } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUS } from "../utils/statusCodes.js";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errors: errors.array() });
  } else {
    next();
  }
};
