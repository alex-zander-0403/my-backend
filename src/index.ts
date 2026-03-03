import { app } from "./app";

const port = 3000;

// запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен! порт = ${port}`);
});
