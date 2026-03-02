import express, { Request, Response } from "express";

import { UserApiModel } from "./models/UserApiModel";

import { addCoursesRoutes } from "./routes/usersRoute";

// =========={  }==========

//

export const app = express();
app.use(express.json());

//

addCoursesRoutes(app);

// endpoint for tests
app.delete("/__test__/data", (req: Request, res: Response) => {
  dbUsers = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
