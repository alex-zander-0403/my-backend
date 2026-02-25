// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   roots: ["<rootDir>/__tests__/e2e/"],
//   testMatch: ["**/*.test.ts"],
//   verbose: true,
// };

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//   },
//   moduleFileExtensions: ['ts', 'js', 'json'],
// };

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   roots: ["<rootDir>/__tests__/e2e/"],
//   testMatch: ["**/*.test.ts"],
//   verbose: true,
//   moduleFileExtensions: ["ts", "js", "json"], // Добавляем расширения
//   moduleDirectories: ["node_modules", "src"], // Добавляем src в пути поиска
// };

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   roots: ["<rootDir>/__tests__/", "<rootDir>/src/"],
//   testMatch: ["**/__tests__/**/*.test.ts"],
//   transform: {
//     "^.+\\.tsx?$": [
//       "ts-jest",
//       {
//         tsconfig: "tsconfig.json", // Убедитесь, что путь правильный
//       },
//     ],
//   },
//   moduleFileExtensions: ["ts", "js", "json"],
// };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  verbose: true,
};
