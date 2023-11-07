module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    es2020: true,
    mocha: true,
  },
  globals: {
    sinon: true,
    expect: true,
    setupDefaultMocks: "readonly",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["node_modules", "build", "dist", "coverage"],
  rules: {
    "no-console": 2,
    "padding-line-between-statements": [
      "error",
      { blankLine: "any", prev: "*", next: "*" },
    ],
  },
};
