import { app } from "./app.js";
import { runDB } from "./dal/db.js";

const port = process.env.PORT || 3000;

//
async function startApp() {
  await runDB();

  app.listen(port, () => {
    console.log(`Сервер запущен! PORT = ${port}`);
  });
}

startApp();
