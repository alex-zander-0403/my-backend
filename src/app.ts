import express from "express";
import { usersRouter } from "./routes/usersRouter";

// ============================================================

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
