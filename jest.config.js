module.exports = {
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: [".tsx"],
    transform: {
        "^.+\\.[jt]sx?$": `<rootDir>/jest-preprocess.js`,
    },
    testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
    testPathIgnorePatterns: [
        "/node_modules/",
        "./src/__tests__/setup",
        "dist",
    ],
    setupFiles: ["./src/__tests__/setup/setupTests.ts"],
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    coverageDirectory: "./coverage/",
    collectCoverage: true,
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};
