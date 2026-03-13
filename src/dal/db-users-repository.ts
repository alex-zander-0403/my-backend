import type { CreateUserModel } from "../models/CreateUserModel.js";
import type { UpdateUserModel } from "../models/UpdateUserModel.js";
import { mongoClient } from "./db.js";

export type UserType = {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
  money: number;
};

// аналог бд
// let _DB: UserType[] = [
//   { id: 1, name: "Alex", age: 43, hasCar: true, money: 2500 },
//   { id: 2, name: "Bob", age: 45, hasCar: false, money: 130 },
//   { id: 3, name: "Carl", age: 23, hasCar: true, money: 1000 },
// ];

// =======================================================

export const usersRepository = {
  //
  // =========={ async GET }==========
  async getUsers(queryString: string | null): Promise<UserType[]> {
    if (queryString) {
      return mongoClient
        .db("users")
        .collection<UserType>("users")
        .find({ queryString: { $regex: queryString } })
        .toArray();
    } else {
      return mongoClient
        .db("users")
        .collection<UserType>("users")
        .find({})
        .toArray();
    }
  },

  // =========={ async GET :id }==========
  async getUserById(id: string): Promise<UserType | null> {
    //

    const user = await mongoClient
      .db("users")
      .collection<UserType>("users")
      .findOne({ id: Number(id) });

    if (user) {
      return user;
    } else {
      return null;
    }
  },

  // =========={ async POST }========== CreateUserModel?
  async createUser(newUserData: CreateUserModel): Promise<UserType> {
    const newUser: UserType = {
      id: Number(new Date()),
      name: newUserData.name,
      age: newUserData.age || 0,
      hasCar: newUserData.hasCar || false,
      money: newUserData.money || 0,
    };

    _DB.push(newUser);
    return newUser;
  },

  // =========={ async UPDATE :id }==========
  async updateUser(
    id: string,
    updateUserData: UpdateUserModel,
  ): Promise<boolean> {
    let userForUpdate = _DB.find((user) => user.id === Number(id));

    // update
    if (userForUpdate) {
      if (updateUserData.name !== undefined) {
        userForUpdate.name = updateUserData.name;
      }

      if (updateUserData.age !== undefined) {
        userForUpdate.age = updateUserData.age;
      }

      if (updateUserData.hasCar !== undefined) {
        userForUpdate.hasCar = updateUserData.hasCar;
      }

      return true;
    } else {
      return false;
    }
  },

  // =========={ async DELETE :id }==========
  async deleteUserById(id: string): Promise<void> {
    _DB = _DB.filter((user) => user.id !== Number(id));
  },

  // =========={ RESET - TEST ROUTE }==========
  testReset() {
    _DB = [];
  },
};
