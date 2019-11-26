module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$",
      "astTransformers": ["jest-preset-angular/InlineHtmlStripStylesTransformer"],
      "diagnostics": false
    }
  },
  "preset": "jest-preset-angular",
  "roots": [
    "<rootDir>/src"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/../../src/setup-jest.ts"
  ],
  "testResultsProcessor": "jest-sonar-reporter",
  "coverageDirectory": "<rootDir>/coverage",
  "coverageReporters": [
    "lcov"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/lib/**/*.ts",
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "^.*\\.spec.ts$",
    "^.*\\.module.ts$",
    "/test/",
    "/mock/",
    "/.*-demo.*/"
  ]
}
