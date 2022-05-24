/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|svg|styl)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
};
