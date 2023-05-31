module.exports = {
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).js?(x)'
    ],
    testPathIgnorePatterns: [
        '/node_modules',
        '/dist/',
        '/src/server/',
        '/testing/'
    ]
};