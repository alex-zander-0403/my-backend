import express, { Request, Response } from "express";
import { CreateUserModel } from "src/models/CreateUserModel";
import { GetQueryUserModel } from "src/models/GetQueryUserModel";
import { UpdateUserModel } from "src/models/UpdateUserModel";
import { UserApiModel } from "src/models/UserApiModel";
import { UserUriParamsModel } from "src/models/UserUriParamsModel";
import {
  RequestWithBodyType,
  RequestWithParamsAndBodyType,
  RequestWithParamsType,
  RequestWithQueryType,
} from "src/types/endpointTypes";
import { HTTP_STATUS } from "../../src/utils/statusCodes";
import { usersRepository, UserType } from "../dal/users-repository";

// ============================================================

// утилита для приведения UserType к <UserApiModel>
const getUserApiModel = (user: UserType): UserApiModel => {
  return { id: user.id, name: user.name, age: user.age, hasCar: user.hasCar };
};

// ============================================================

// создание роутера
export const usersRouter = express.Router();

// конфигурируем роутер
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
  (req: RequestWithBodyType<CreateUserModel>, res: Response<UserApiModel>) => {
    if (!req.body.name) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

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
  (
    req: RequestWithParamsAndBodyType<UserUriParamsModel, UpdateUserModel>,
    res: Response,
  ) => {
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
