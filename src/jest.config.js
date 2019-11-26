const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.spec');

module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfig": "./src/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$",
      "astTransformers": ["jest-preset-angular/InlineHtmlStripStylesTransformer"],
      "diagnostics": false
    }
  },
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup-jest.ts"
  ],
  "roots": [
    "src"
  ],
  "moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/src/'}),
  "testResultsProcessor": "jest-sonar-reporter",
  "coverageReporters": [
    "lcov"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/app/**/*.ts"
  ],
  "coverageDirectory": "coverage",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/swagger-generated/",
    "^.*\\.spec.ts$",
    "^.*\\.module.ts$",
    "/test/",
    "/mock/",
    "/.*-demo.*/"
  ],
  "snapshotSerializers": [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
}
