import express, { type Request, type Response } from "express";
import type {
  RequestWithBodyType,
  RequestWithParamsType,
  RequestWithParamsAndBodyType,
  RequestWithQueryType,
} from "./types/endpointTypes.js";
import type { CreateUserModel } from "./models/CreateUserModel.js";
import type { UpdateUserModel } from "./models/UpdateUserModel.js";
import type { GetQueryUserModel } from "./models/GetQueryUserModel.js";
import type { UserApiModel } from "./models/UserApiModel.js";
import type { UserUriParamsModel } from "./models/UserUriParamsModel.js";

export const app = express();
const port = 3000;

app.use(express.json());

// =========={  }==========

type UserType = {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
  money: number;
};

let dbUsers: UserType[] = [
  { id: 1, name: "Alex1", age: 43, hasCar: true, money: 2500 },
  { id: 2, name: "Bob", age: 45, hasCar: false, money: 130 },
  { id: 3, name: "Carl", age: 23, hasCar: true, money: 1000 },
];

const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const getUserApiModel = (user: UserType): UserApiModel => {
  return { id: user.id, name: user.name, age: user.age, hasCar: user.hasCar };
};

// =========={ GET }==========

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, main page!!!");
});

// GET /users?name=alex
app.get(
  "/users",
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

app.get(
  "/users/:id",
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

app.post(
  "/users",
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

app.delete(
  "/users/:id",
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

app.put(
  "/users/:id",
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

// endpoint for tests
app.delete("/__test__/data", (req: Request, res: Response) => {
  dbUsers = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
