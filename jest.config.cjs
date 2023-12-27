/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/mocks/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/src/mocks/styleMock.ts",
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  }
};