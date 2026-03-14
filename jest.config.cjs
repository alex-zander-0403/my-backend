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

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   roots: ["<rootDir>/__tests__"],
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
// };

module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(mongodb|@mongodb|express|)/)", // Игнорируем node_modules кроме указанных
  ],
};
