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

export const usersRepository = {
  findUsers(queryString: string | null) {
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

  // for tests
  // clearUsersDB() {
  //   DB = [];
  // },
};
