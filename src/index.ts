const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let myUsers = [
  { id: 1, name: "Alex", age: 33, hasCar: true },
  { id: 2, name: "Bob", age: 45, hasCar: false },
  { id: 3, name: "Carl", age: 23, hasCar: true },
];

// ===== GET =====
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

// ===== POST =====
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

  myUsers.push(newUser);
  res.status(201).json(newUser);
});

// ===== DELETE =====
// fetch('http://localhost:3000/users/1', {
//     method: "DELETE"})

//     .then((res) => res.json())
//     .then((data) => console.log(data))

app.delete("/users/:id", (req, res) => {
  myUsers = myUsers.filter((user) => user.id !== Number(req.params.id));

  res.status(204);
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
