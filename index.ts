const express = require("express");
const app = express();
const port = 3000;

//
app.get("/", (req, res) => {
  res.send("Hello!!!");
});

app.post("/", (req, res) => {
  res.send("New World!");
});

//
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
