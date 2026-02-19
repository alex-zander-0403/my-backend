const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let dbUsers = [
  { id: 1, name: "Alex", age: 33, hasCar: true },
  { id: 2, name: "Bob", age: 45, hasCar: false },
  { id: 3, name: "Carl", age: 23, hasCar: true },
];

// =========={ GET }==========

app.get("/", (req, res) => {
  res.send("Hello, main page!!!");
});

// GET /users?age=30
app.get("/users", (req, res) => {
  // const { age } = req.query;
  let foundedUsers = dbUsers;

  if (req.query.age) {
    foundedUsers = dbUsers.filter((user) => user.age >= req.query.age);
  }

  res.json(foundedUsers);
});

app.get("/users/:id", (req, res) => {
  const foundedUser = dbUsers.find((user) => user.id === Number(req.params.id));

  if (!foundedUser) {
    res.status(404).send("Страница не найдена!");
    return;
  }

  res.json(foundedUser);
});

// =========={ POST }==========

// fetch('http://localhost:3000/users', {
//     method: "POST",
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({ name: "David", age: 100, hasCar: true}) })
//     .then((res) => res.json())
//     .then((data) => console.log(data))

app.post("/users", (req, res) => {
  // const { name, age, hasCar } = req.body;

  const newUser = {
    id: Number(new Date()),
    name: req.body.name,
    age: req.body.age,
    hasCar: req.body.hasCar,
  };

  dbUsers.push(newUser);
  res.status(201).json(newUser);
});

// =========={ DELETE }==========

// fetch('http://localhost:3000/users/1', {
//     method: "DELETE"})
//     .then((res) => res.json())
//     .then((data) => console.log(data))

app.delete("/users/:id", (req, res) => {
  dbUsers = dbUsers.filter((user) => user.id !== Number(req.params.id));

  res.sendStatus(204);
});

// =========={ UPDATE }==========

// fetch('http://localhost:3000/users/1', {
//     method: "PUT",
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({ name: "David", age: 100, hasCar: true}) })
//     .then((res) => res.json())
//     .then((data) => console.log(data))

app.put("/users/:id", (req, res) => {

  // поиск user для редактирования
  let userForUpdate = dbUsers.find((user) => user.id === Number(req.params.id));

  // проверка на наличие user
  if (!userForUpdate) {
    res.status(404).send("Пользователь для редактирования не найден!");
    return;
  }

  // update
  userForUpdate.name = req.body.name;
  userForUpdate.age = req.body.age;
  userForUpdate.hasCar = req.body.hasCar;

  res.status(200).json(userForUpdate);
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
