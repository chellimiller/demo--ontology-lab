/**
 * This is the configuration for {@link https://prettier.io/ Prettier}.
 *
 * Prettier is a tool for formatting code.
 *
 * Prettier is opinionated, meaning that it doesn't have many configuration options.
 * Prettier's simplicity allows it to be fast and work with many different development languages.
 *
 * Formatting is important for improving the readability of the code.
 * Readable code is more maintainable and less prone to errors.
 *
 * @see {@link https://prettier.io/docs/en/configuration.html Configuring Prettier}
 * @type {Object}
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: false,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
};

module.exports = config;
