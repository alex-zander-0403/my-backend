import { Request, Response } from "express";
import { db } from "src/db/db";
import { HTTP_STATUS } from "./usersRouter";

let dbUsers = db;

// ============================================================

// endpoint for tests
export function testsRoute(app: any) {
  app.delete("/__test__/data", (req: Request, res: Response) => {
    dbUsers = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  });
}
