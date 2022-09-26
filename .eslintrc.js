// eslint-disable-next-line no-undef
module.exports = {
  extends: ["plugin:vue/essential", "@vue/typescript/recommended", "eslint:recommended"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "vue/multi-word-component-names": "off"
  },
  ignorePatterns: [
    'scripts'
  ]
}
