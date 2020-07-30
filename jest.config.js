module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.ts',
        '!**/node_modules/**',
        '!**/types/**',
        '!**/dist/**',
        '!**/*tmp*',
        '!**/coverage/**',
    ],
};