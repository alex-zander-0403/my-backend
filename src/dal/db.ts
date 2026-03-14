import { MongoClient } from "mongodb";

export type UserType = {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
  money: number;
};

// =======================================================

// строка подключения к atlas mongoDB
// mongodb+srv://AlexZander0403:<db_password>@cluster0.xkagbxa.mongodb.net/?appName=Cluster0
const mongoURI =
  process.env.mongoURI ||
  `mongodb+srv://AlexZander0403:mongopassword123@cluster0.xkagbxa.mongodb.net/?appName=Cluster0`;

// создание клиента для mongoBD
export const mongoClient = new MongoClient(mongoURI);

// переменная обертка для доступа к бд users
const usersDB = mongoClient.db("users");
// переменная обертка для доступа к коллекции в бд
export const usersCollection = usersDB.collection<UserType>("users");

// подключение к бд
export async function runDB() {
  try {
    // подключение
    await mongoClient.connect();

    // пингуем
    await mongoClient.db("users").command({ ping: 1 });
    console.log("DB ready to work!");
  } catch {
    console.log("Can't connect to DB!");
    await mongoClient.close();
  }
}
