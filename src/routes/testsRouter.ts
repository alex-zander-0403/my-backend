import express, { Request, Response } from "express";
// import { db } from "../db/db";
import { HTTP_STATUS } from "../utils/statusCodes";

// let dbUsers = db;

// ============================================================

// создание роутера
export const testsRouter = express.Router();

// конфигурируем роутер
testsRouter.delete("/data", (req: Request, res: Response) => {
  // dbUsers = [];

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
