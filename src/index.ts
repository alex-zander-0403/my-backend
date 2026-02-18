const express = require("express");
const app = express();
const port = 3000;

const myUsers = [
  { id: 1, name: "Alex", age: 33, hasCar: true },
  { id: 2, name: "Bob", age: 45, hasCar: false },
  { id: 3, name: "Carl", age: 23, hasCar: true },
];

//
app.get("/", (req, res) => {
  res.send("Hello, main page!!!");
});

// GET /users?age=30
app.get("/users", (req, res) => {
  // const { age } = req.query;
  let foundedUsers = myUsers;

  if (req.query.age) {
    foundedUsers = myUsers.filter((user) => user.age >= req.query.age);
  }

  res.json(foundedUsers);
});

app.get("/users/:id", (req, res) => {
  const foundedUser = myUsers.find((user) => user.id === Number(req.params.id));

  if (!foundedUser) {
    res.status(404).send("Страница не найдена!");
    return;
  }

  res.json(foundedUser);
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
