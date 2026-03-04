import { CreateUserModel } from "src/models/CreateUserModel";
import { UpdateUserModel } from "src/models/UpdateUserModel";

export type UserType = {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
  money: number;
};

// аналог бд
let DB: UserType[] = [
  { id: 1, name: "Alex", age: 43, hasCar: true, money: 2500 },
  { id: 2, name: "Bob", age: 45, hasCar: false, money: 130 },
  { id: 3, name: "Carl", age: 23, hasCar: true, money: 1000 },
];

// =======================================================

export const usersRepository = {
  // =========={ GET }==========
  getUsers(queryString: string | null) {
    if (queryString) {
      const filteredUsers = DB.filter(
        (user) =>
          user.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1,
      );
      return filteredUsers;
    } else {
      return DB;
    }
  },

  // =========={ GET :id }==========
  getUserById(id: string) {
    const foundedUser = DB.find((user) => user.id === Number(id));

    return foundedUser;
  },

  // =========={ POST }========== CreateUserModel?
  createUser(newUserData: CreateUserModel) {
    const newUser: UserType = {
      id: Number(new Date()),
      name: newUserData.name,
      age: newUserData.age || 0,
      hasCar: newUserData.hasCar || false,
      money: newUserData.money || 0,
    };

    DB.push(newUser);
    return newUser;
  },

  // =========={ UPDATE :id }==========

  updateUser(id: string, updateUserData: UpdateUserModel) {
    let userForUpdate = DB.find((user) => user.id === Number(id));

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

  // =========={ DELETE :id }==========

  deleteUserById(id: string) {
    DB = DB.filter((user) => user.id !== Number(id));
  },
};
