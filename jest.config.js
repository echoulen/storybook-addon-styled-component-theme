module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      skipBabel: true,
    },
  },
  testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
  testPathIgnorePatterns: ["/node_modules/", "./src/__tests__/setup"],
  setupFiles: ["./src/__tests__/setup/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  coverageReporters: ["text", "json", "lcov"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["^.+\\.d\\.ts$"],
  watchman: false,
};
