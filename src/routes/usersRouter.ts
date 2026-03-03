import express, { Request, Response } from "express";
import { db, UserType } from "../db/db";
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

let dbUsers = db;

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
    // const { name } = req.query;
    let foundedUsers = dbUsers;

    if (req.query.name) {
      foundedUsers = dbUsers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1,
      );
    }

    // обязательное приведение UserType к <UserApiModel>
    // с помощью пересборки объекта функцией getUserApiModel
    res.json(foundedUsers.map(getUserApiModel));
  },
);

usersRouter.get(
  "/:id",
  (
    req: RequestWithParamsType<UserUriParamsModel>,
    res: Response<UserApiModel>,
  ) => {
    const foundedUser = dbUsers.find(
      (user) => user.id === Number(req.params.id),
    );

    if (!foundedUser) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    // обязательное приведение UserType к <UserApiModel>
    // с помощью пересборки объекта функцией getUserApiModel
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
    // const { name, age, hasCar } = req.body;

    if (!req.body.name) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

    const newUser: UserType = {
      id: Number(new Date()),
      name: req.body.name,
      age: req.body.age || 0,
      hasCar: req.body.hasCar || false,
      money: req.body.money || 0,
    };

    dbUsers.push(newUser);

    // обязательное приведение UserType к <UserApiModel>
    // с помощью пересборки объекта функцией getUserApiModel
    res.status(HTTP_STATUS.CREATED_201).json(getUserApiModel(newUser));
  },
);

// =========={ DELETE }==========

// fetch('http://localhost:3000/users/1', {
//     method: "DELETE"})
//     .then((res) => res.json())
//     .then((data) => console.log(data))

usersRouter.delete(
  "/:id",
  (req: RequestWithParamsType<UserUriParamsModel>, res: Response) => {
    dbUsers = dbUsers.filter((user) => user.id !== Number(req.params.id));

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  },
);

// =========={ UPDATE }==========

// fetch('http://localhost:3000/users/1', {
//     method: "PUT",
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({ name: "David", age: 100, hasCar: true}) })
//     .then((res) => res.json())
//     .then((data) => console.log(data))

usersRouter.put(
  "/:id",
  (
    req: RequestWithParamsAndBodyType<UserUriParamsModel, UpdateUserModel>,
    res: Response,
  ) => {
    // поиск user для редактирования
    let userForUpdate = dbUsers.find(
      (user) => user.id === Number(req.params.id),
    );

    // проверка на наличие user
    if (!userForUpdate) {
      res
        .status(HTTP_STATUS.NOT_FOUND_404)
        .send("Пользователь для редактирования не найден!");
      return;
    }

    // update
    userForUpdate.name = req.body.name;
    userForUpdate.age = req.body.age || 0;
    userForUpdate.hasCar = req.body.hasCar || false;

    res.status(HTTP_STATUS.OK_200).json(userForUpdate);
  },
);
