module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      compiler: "typescript",
    },
  },
  testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "./src/__tests__/setup",
    "dist",
  ],
  setupFiles: ["./src/__tests__/setup/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
};
