module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/test/fileMock.js',
        '\\.(css|less)$': '<rootDir>/test/styleMock.js',
      },
    globals: {
      window: {},
    },
    reporters: [
      "default",
      [
        "./node_modules/jest-html-reporter",
        {
          pageTitle: "Unit Test Report",
          outputPath: "./frontend/coverage/report.html",
        },
      ],
    ],
  };