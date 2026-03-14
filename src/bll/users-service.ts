import { usersRepository } from "../dal/db-users-repository.js";
import type { CreateUserModel } from "../models/CreateUserModel.js";
import type { UpdateUserModel } from "../models/UpdateUserModel.js";
import { type UserType } from "../dal/db.js";

// =======================================================

export const usersService = {
  // =========={ async GET }==========
  async getUsers(queryString: string | null): Promise<UserType[]> {
    const users = usersRepository.getUsers(queryString);

    return users;
  },

  // =========={ async GET :id }==========
  async getUserById(id: string): Promise<UserType | null> {
    const user = usersRepository.getUserById(Number(id));

    return user;
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

    const createdUser = await usersRepository.createUser(newUser);

    return createdUser;
  },

  // =========={ async UPDATE :id }==========
  async updateUser(
    id: string,
    updateUserData: UpdateUserModel,
  ): Promise<boolean> {
    return await usersRepository.updateUser(Number(id), updateUserData);
  },

  // =========={ async DELETE :id }==========
  async deleteUserById(id: string): Promise<void> {
    await usersRepository.deleteUserById(Number(id));
  },

  // =========={ RESET - TEST ROUTE }==========
  testReset() {
    // _DB = [];
  },
};
