module.exports = {
  preset: "ts-jest", //
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__/e2e/"],
  testMatch: ["**/*.test.ts"],
  verbose: true,
};
