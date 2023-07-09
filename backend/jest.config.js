module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testMatch: ["**/*.test.ts"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/*","<rootDir>/dist/*", "<rootDir>/src/__tests__/__fixtures__/*"]
};

