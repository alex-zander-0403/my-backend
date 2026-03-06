import express, { type Request, type Response } from "express";
import { HTTP_STATUS } from "../utils/statusCodes.js";

// ============================================================

// создание роутера
export const testsRouter = express.Router();

// конфигурируем роутер
testsRouter.delete("/data", (req: Request, res: Response) => {
  // dbUsers = [];

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
