#!/usr/bin/env node

const Mustache = require('mustache');
const fs = require('fs/promises');
const path = require('path');
const ROOT = path.dirname(__dirname);
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');
const { kebabCase } = require('lodash');

/**
 * @typedef {Object} FileTransformer
 * @property {string} path
 * @property {'template' | 'json' | 'text'} type
 * @property {string} template
 * @property {Function} handler
 *
 * @typedef {Object} SetupOptions
 * @property {string} title
 * @property {string} shortName
 * @property {string} description
 * @property {string} databaseName
 * @property {number} copyrightYear
 * @property {string} authorName
 * @property {string} authorEmail
 * @property {string} authorUrl
 * @property {string} packageName
 * @property {string} themeColor
 * @property {string} githubUrl
 *
 * @type {SetupOptions}
 */
const DEFAULT_OPTIONS = {
  databaseName: 'utori-dev--react-app-prototype',
  title: 'React App Prototype',
  shortName: 'Prototype',
  description: 'Template for creating prototypes with React',
  copyrightYear: new Date().getFullYear(),
  authorName: 'Michelle Miller',
  authorEmail: 'michelle@utori.dev',
  authorUrl: 'https://github.com/chellimiller',
  packageName: '@utori-dev/template-react-app-prototype',
  themeColor: '#4898da',
  githubUrl: 'https://github.com/utori-dev/template-react-app-prototype',
};

async function loadFileContent(filePath) {
  return fs.readFile(filePath, { encoding: 'utf-8' });
}

/**
 *
 * @param {FileTransformer} transformer
 * @param {SetupOptions} options
 * @returns {Promise<string>}
 */
async function transformTemplateFile(transformer, options) {
  const templateFile = `${transformer.template}.mustache`;
  const template = await loadFileContent(path.join(__dirname, templateFile));
  return Mustache.render(template, options);
}

/**
 *
 * @param {FileTransformer} transformer
 * @param {SetupOptions} options
 * @returns {Promise<string>}
 */
async function transformJsonFile(transformer, options) {
  const text = await loadFileContent(transformer.path);
  const json = await transformer.handler({
    content: JSON.parse(text),
    options,
  });
  return JSON.stringify(json, null, 2);
}

/**
 *
 * @param {FileTransformer} transformer
 * @param {SetupOptions} options
 * @returns {Promise<string>}
 */
async function transformTextFile(transformer, options) {
  const content = await loadFileContent(transformer.path);
  return await transformer.handler({
    content,
    options,
  });
}

/**
 *
 * @param {FileTransformer} transformer
 * @param {SetupOptions} options
 * @returns {Promise<string>}
 */
async function transformFile(transformer, options) {
  switch (transformer.type) {
    case 'template':
      return transformTemplateFile(transformer, options);
    case 'json':
      return transformJsonFile(transformer, options);
    case 'text':
      return transformTextFile(transformer, options);
    default:
      throw new Error(`Invalid transformer type "${transformer.type}"`);
  }
}

/** *
 *
 * @type {Record<string, FileTransformer>}
 */
const TRANSFORMERS = {
  README: {
    path: path.join(ROOT, 'README.md'),
    type: 'template',
    template: 'README.md',
  },
  LICENSE: {
    path: path.join(ROOT, 'LICENSE'),
    type: 'template',
    template: 'LICENSE',
  },
  packageJson: {
    path: path.join(ROOT, 'package.json'),
    type: 'json',
    handler: async ({ content, options }) => {
      const {
        authorEmail = '',
        authorName,
        authorUrl = '',
        packageName,
        description,
        githubUrl,
      } = options;

      delete content.maintainers;
      content.author =
        authorEmail && authorUrl
          ? {
              name: authorName,
              email: authorEmail,
              url: authorUrl,
            }
          : [
              authorName,
              authorEmail && `<${authorEmail}>`,
              authorUrl && `(${authorUrl})`,
            ]
              .filter((item) => !!item)
              .join(' ');
      content.name = packageName;
      content.description = description;
      content.repository.url = content.repository.url.replace(
        DEFAULT_OPTIONS.githubUrl,
        githubUrl
      );
      content.bugs.url = content.bugs.url.replace(
        DEFAULT_OPTIONS.githubUrl,
        githubUrl
      );
      content.homepage = content.homepage.replace(
        DEFAULT_OPTIONS.githubUrl,
        githubUrl
      );

      return content;
    },
  },
  manifestJson: {
    path: path.join(PUBLIC, 'manifest.json'),
    type: 'json',
    handler: async ({ content, options }) => {
      const { title, shortName, themeColor, description } = options;

      content.name = title;
      content.short_name = shortName;
      content.theme_color = themeColor;
      content.description = description;

      return content;
    },
  },
  indexHtml: {
    path: path.join(PUBLIC, 'index.html'),
    type: 'text',
    handler: async ({ content, options }) => {
      const { title, shortName, themeColor, description } = options;

      return content
        .replace(DEFAULT_OPTIONS.title, title)
        .replace(DEFAULT_OPTIONS.shortName, shortName)
        .replace(DEFAULT_OPTIONS.description, description)
        .replace(DEFAULT_OPTIONS.themeColor, themeColor);
    },
  },
  databaseFile: {
    path: path.join(SRC, 'state', 'database', '_dexie.ts'),
    type: 'text',
    handler: async ({ content, options }) => {
      const { databaseName } = options;
      return content.replace(DEFAULT_OPTIONS.databaseName, databaseName);
    },
  },
  appRootFile: {
    path: path.join(SRC, 'App.tsx'),
    type: 'text',
    handler: async ({ content, options }) => {
      const { title } = options;
      return content.replace(DEFAULT_OPTIONS.title, title);
    },
  },
};

require('yargs')
  .scriptName('setup')
  .usage('$0 <cmd> [args]')
  .command('$0', 'Runs setup script for the tool', {
    builder: (yargs) => {
      yargs.option('title', {
        describe: 'The title of the new project.',
        type: 'string',
        require: true,
      });
      yargs.option('description', {
        describe: 'Description of the new project.',
        alias: 'd',
        type: 'string',
        require: true,
      });
      yargs.option('short-name', {
        describe: 'The short name of the new project. Used in the manifest.',
        alias: 'sn',
        type: 'string',
        default: DEFAULT_OPTIONS.shortName,
      });
      yargs.option('package-name', {
        describe:
          'The name of the package. Include @organization prefix if applicable.',
        alias: 'p',
        type: 'string',
        require: true,
      });
      yargs.option('github-url', {
        describe: 'URL for the GitHub repository.',
        alias: 'g',
        type: 'string',
        require: true,
      });
      yargs.option('database-name', {
        describe: 'Name for the Dexie database',
        alias: 'db',
        type: 'string',
      });
      yargs.option('author-name', {
        describe: 'Name of the repository author',
        alias: 'an',
        type: 'string',
        require: true,
      });
      yargs.option('author-email', {
        describe: 'Email of the repository author',
        alias: 'ae',
        type: 'string',
        require: false,
      });
      yargs.option('author-url', {
        describe: 'URL of the author',
        alias: 'au',
        type: 'string',
        require: false,
      });
      yargs.option('theme-color', {
        describe: 'Theme color for the app. Used in manifest and index.html.',
        type: 'string',
        default: DEFAULT_OPTIONS.themeColor,
      });
    },
    handler: async (args) => {
      const {
        title,
        description,
        githubUrl,
        databaseName = kebabCase(title),
        authorName,
        authorUrl,
        authorEmail,
        themeColor,
        shortName,
        packageName,
      } = args;

      /** @type {SetupOptions} */
      const options = {
        title,
        description,
        githubUrl,
        databaseName,
        authorName,
        authorUrl,
        authorEmail,
        themeColor,
        shortName,
        packageName,
        copyrightYear: DEFAULT_OPTIONS.copyrightYear,
      };

      Promise.all(
        Object.values(TRANSFORMERS).map((transformer) =>
          transformFile(transformer, options).then(
            async (content) => await fs.writeFile(transformer.path, content)
          )
        )
      ).then((result) => console.log(`Transformed ${result.length} files`));
    },
  })
  .demandCommand(1, 'No command was specified')
  .strictCommands()
  .help()
  .alias('h', 'help')
  .alias('v', 'version').argv;
