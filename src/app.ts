import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { usersRouter } from "./routes/usersRouter.js";
import { testsRouter } from "./routes/testsRouter.js";

// ============================================================

export const app = express();

app.use(express.json());

// роутеры
app.use("/users", usersRouter);
app.use("/__tests__", testsRouter);
