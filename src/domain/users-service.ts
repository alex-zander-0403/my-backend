import type { CreateUserModel } from "../models/CreateUserModel.js";
import type { UpdateUserModel } from "../models/UpdateUserModel.js";
import { usersCollection, type UserType } from "./db.js";

// =======================================================

export const usersRepository = {
  // =========={ async GET }==========
  async getUsers(queryString: string | null): Promise<UserType[]> {
    //
    let filter: any = {};

    if (queryString) {
      filter.queryString = { $regex: queryString };
    }

    return usersCollection.find(filter).toArray();
  },

  // =========={ async GET :id }==========
  async getUserById(id: string): Promise<UserType | null> {
    const user = await usersCollection.findOne({ id: Number(id) });

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

    await usersCollection.insertOne(newUser);

    return newUser;
  },

  // =========={ async UPDATE :id }==========
  async updateUser(
    id: string,
    updateUserData: UpdateUserModel,
  ): Promise<boolean> {
    //
    let userForUpdate = await usersCollection.findOne({ id: Number(id) });

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

      await usersCollection.updateOne(
        { id: Number(id) },
        { $set: userForUpdate },
      );

      return true;
    } else {
      return false;
    }
  },

  // =========={ async DELETE :id }==========
  async deleteUserById(id: string): Promise<void> {
    // _DB = _DB.filter((user) => user.id !== Number(id));

    await usersCollection.deleteOne({ id: Number(id) });
  },

  // =========={ RESET - TEST ROUTE }==========
  testReset() {
    // _DB = [];
  },
};
