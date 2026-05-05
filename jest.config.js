// Конфигурация Jest для запуска через Node (если установлен).
// Альтернатива: `bun test` — встроенный Jest-совместимый раннер Bun.
const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/tests/e2e/"],
  testMatch: ["**/tests/unit/**/*.test.{ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);
