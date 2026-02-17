const express = require("express");
const app = express();
const port = 3000;

const myUsers = [
  { id: 1, name: "Alex", hasCar: true },
  { id: 2, name: "Bob", hasCar: false },
  { id: 3, name: "Carl", hasCar: true },
];

//
app.get("/", (req, res) => {
  res.send("Hello, main page!!!");
});

app.get("/users", (req, res) => {
  res.json(myUsers);
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
