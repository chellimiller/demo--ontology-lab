/**
 * Webpack is a tool for packaging web apps.
 *
 * Web apps contain HTML, CSS, JavaScript, and several other file types.
 * This complexity can be time-consuming and error prone to manage manually.
 *
 * Though it can be difficult to use at first,
 * Webpack is highly configurable.
 * This makes it a great choice for many projects.
 *
 * Webpack is configured through loaders and plugins.
 * @type {Object}
 */
const webpack = require('webpack');
// Imported for reliable creation of file paths.
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    // Put output in the `dist/` directory.
    path: path.resolve(__dirname, 'dist'),
    // Bundle loaded source files into `bundle.js`.
    filename: 'bundle.js',
    // Clean out the previous build.
    clean: true,
  },
  /**
   * Using a development server allows the app to be served with live-reloading.
   * This makes it possible to test the app while coding,
   * since the app will update each time a file change is saved.
   *
   * The quick feedback increases development speed drastically.
   *
   * **Note:** This should only be used in development,
   * as it is not designed for production environments.
   *
   * @see {@link https://webpack.js.org/configuration/dev-server/ DevServer Configuration Guide}
   */
  devServer: {
    // Open the development server in the browser automatically.
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // This loader processes TypeScript source code.
        // Unlike the @babel/plugin-transform-typescript, this does type checking.
        // This makes it slower, but ensures type safety is provided.
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // This loader is from the MiniCssExtractPlugin, which extracts CSS into external files.
          MiniCssExtractPlugin.loader,
          // This loader interprets `@import` and `url()` like `import/require()` and will resolve them.
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    /**
     * This plugin copies files or directories into the output directory.
     *
     * This is useful for including assets like `index.html`,
     * images, and other files that don't need special processing.
     *
     * This is configured to copy everything from the `public/` folder into the build.
     */
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    /**
     * This plugin extracts CSS into external files.
     * It also includes a loader that is intended to be used with the `css-loader`.
     *
     * This is configured to extract all of the CSS into a `styles.css` file.
     */
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
