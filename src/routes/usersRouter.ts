import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { body, validationResult } from "express-validator";
import { usersRepository, type UserType } from "../dal/users-repository.js";
import type { UserApiModel } from "../models/UserApiModel.js";
import type { GetQueryUserModel } from "../models/GetQueryUserModel.js";
import type {
  RequestWithBodyType,
  RequestWithParamsAndBodyType,
  RequestWithParamsType,
  RequestWithQueryType,
} from "../types/endpointTypes.js";
import type { UserUriParamsModel } from "../models/UserUriParamsModel.js";
import { HTTP_STATUS } from "../utils/statusCodes.js";
import type { CreateUserModel } from "../models/CreateUserModel.js";
import type { UpdateUserModel } from "../models/UpdateUserModel.js";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware.js";

// ============================================================

// утилита для приведения UserType к <UserApiModel>
const getUserApiModel = (user: UserType): UserApiModel => {
  return { id: user.id, name: user.name, age: user.age, hasCar: user.hasCar };
};

// ============================================================

export const usersRouter = express.Router();

// =========={ GET }==========
// GET /users?name=alex
usersRouter.get(
  "/",
  (
    req: RequestWithQueryType<GetQueryUserModel>,
    res: Response<UserApiModel[]>,
  ) => {
    const users = usersRepository.getUsers(req.query.name || null);

    res.json(users.map(getUserApiModel));
  },
);

usersRouter.get(
  "/:id",
  (
    req: RequestWithParamsType<UserUriParamsModel>,
    res: Response<UserApiModel>,
  ) => {
    const foundedUser = usersRepository.getUserById(req.params.id);

    if (!foundedUser) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    res.json(getUserApiModel(foundedUser));
  },
);

// =========={ POST }==========
// fetch('http://localhost:3000/users', {
//     method: "POST",
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({ name: "David", age: 100, hasCar: true}) })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
usersRouter.post(
  "/",
  nameValidationMiddleware,
  inputValidationMiddleware,
  (req: RequestWithBodyType<CreateUserModel>, res: Response<UserApiModel>) => {
    const newUser = usersRepository.createUser(req.body);

    res.status(HTTP_STATUS.CREATED_201).json(getUserApiModel(newUser));
  },
);

// =========={ UPDATE }==========

// fetch("http://localhost:3000/users/1", {
//   method: "PUT",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify({ name: "David", age: 100, hasCar: true }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
usersRouter.put(
  "/:id",
  nameValidationMiddleware,
  inputValidationMiddleware,
  (
    req: RequestWithParamsAndBodyType<UserUriParamsModel, UpdateUserModel>,
    res: Response,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST_400)
        .json({ errors: errors.array() });
    }

    const isUserUpdated = usersRepository.updateUser(req.params.id, req.body);

    if (!isUserUpdated) {
      res
        .status(HTTP_STATUS.BAD_REQUEST_400)
        .send("Пользователь для редактирования не найден!");
      return;
    }

    const updatedUser = usersRepository.getUserById(req.params.id);

    res.status(HTTP_STATUS.OK_200).json(updatedUser);
  },
);

// =========={ DELETE }==========
// fetch("http://localhost:3000/users/1", {
//   method: "DELETE",
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
usersRouter.delete(
  "/:id",
  (req: RequestWithParamsType<UserUriParamsModel>, res: Response) => {
    if (!req.params.id) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

    usersRepository.deleteUserById(req.params.id);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  },

  // =========={ RESET - TEST ROUTE }==========

  usersRouter.delete("/reset", (req: Request, res: Response) => {
    usersRepository.testReset();

    res.sendStatus(HTTP_STATUS.OK_200);
  }),
);
