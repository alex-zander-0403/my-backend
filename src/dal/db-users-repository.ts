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
  async getUserById(id: number): Promise<UserType | null> {
    const user = await usersCollection.findOne({ id });

    if (user) {
      return user;
    } else {
      return null;
    }
  },

  // =========={ async POST }========== CreateUserModel?
  async createUser(newUser: UserType): Promise<UserType> {
    await usersCollection.insertOne(newUser);

    return newUser;
  },

  // =========={ async UPDATE :id }==========
  async updateUser(id: number, updatedUser: UpdateUserModel): Promise<boolean> {
    //
    const result = await usersCollection.updateOne(
      { id },
      { $set: updatedUser },
    );

    return result.matchedCount === 1;
  },

  // =========={ async DELETE :id }==========
  async deleteUserById(id: number): Promise<void> {
    await usersCollection.deleteOne({ id });
  },

  // =========={ RESET - TEST ROUTE }==========
  testReset() {
    // _DB = [];
  },
};
