import express, { type Request, type Response } from "express";

export const app = express();
const port = 3000;

app.use(express.json());

// =========={  }==========

type UserType = {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
};

let dbUsers: UserType[] = [
  { id: 1, name: "Alex", age: 43, hasCar: true },
  { id: 2, name: "Bob", age: 45, hasCar: false },
  { id: 3, name: "Carl", age: 23, hasCar: true },
];

const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

// =========={ GET }==========

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, main page!!!");
});

// GET /users?name=alex
app.get(
  "/users",
  (req: Request<{}, {}, {}, { name: string }>, res: Response<UserType[]>) => {
    // const { name } = req.query;
    let foundedUsers = dbUsers;

    if (req.query.name) {
      foundedUsers = dbUsers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1,
      );
    }

    res.json(foundedUsers);
  },
);

app.get(
  "/users/:id",
  (req: Request<{ id: string }>, res: Response<UserType>) => {
    const foundedUser = dbUsers.find(
      (user) => user.id === Number(req.params.id),
    );

    if (!foundedUser) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    res.json(foundedUser);
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
  (
    req: Request<{}, {}, { name: string; age?: number; hasCar?: boolean }>,
    res: Response<UserType>,
  ) => {
    // const { name, age, hasCar } = req.body;

    if (!req.body.name) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

    const newUser = {
      id: Number(new Date()),
      name: req.body.name,
      age: req.body.age || 0,
      hasCar: req.body.hasCar || false,
    };

    dbUsers.push(newUser);
    res.status(HTTP_STATUS.CREATED_201).json(newUser);
  },
);

// =========={ DELETE }==========

// fetch('http://localhost:3000/users/1', {
//     method: "DELETE"})
//     .then((res) => res.json())
//     .then((data) => console.log(data))

app.delete("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  dbUsers = dbUsers.filter((user) => user.id !== Number(req.params.id));

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

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
    req: Request<
      { id: string },
      {},
      { name: string; age?: number; hasCar?: boolean }
    >,
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
app.delete("/__test__/data", (req, res) => {
  dbUsers = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
