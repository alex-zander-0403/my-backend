// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.ts$": [
//       "ts-jest",
//       {
//         tsconfig: "tsconfig.json",
//       },
//     ],
//   },
//   moduleFileExtensions: ["ts", "js", "json"],
//   testMatch: ["**/__tests__/**/*.test.ts"],
//   verbose: true,
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
