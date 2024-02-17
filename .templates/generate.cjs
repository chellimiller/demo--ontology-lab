#!/usr/bin/env node

const Mustache = require('mustache');
const fs = require('fs/promises');
const path = require('path');
const {
  words,
  capitalize,
  kebabCase,
  camelCase: toCamelCase,
} = require('lodash');

const PACKAGE_ROOT = path.dirname(__dirname);

/**
 * Converts a string value to PascalCase.
 *
 * @param {string} value
 * @returns {string}
 */
function toPascalCase(value) {
  return words(value).map(capitalize).join('');
}

/**
 * Converts a string value to PascalCase and appends `*View` if it's not already appended.
 *
 * @param {string} value
 * @returns {string}
 */
function toViewName(value) {
  const pascalCase = toPascalCase(value);
  return pascalCase.endsWith('View') | pascalCase.endsWith('Dialog')
    ? pascalCase
    : `${pascalCase}View`;
}

/**
 * Converts a string value to PascalCase and appends `*Icon` if it's not already appended.
 *
 * @param {string} value
 * @returns {string}
 */
function toIconName(value) {
  const pascalCase = toPascalCase(value);
  return pascalCase.endsWith('Icon') ? pascalCase : `${pascalCase}Icon`;
}

/**
 * Generates an index file for the specified directory.
 *
 * @param {string} directory
 * @param {object} options
 * @param {boolean} options.defaultExportOnly
 * @returns {Promise<void>}
 */
async function generateIndexFile(directory, options = {}) {
  const { defaultExportOnly = false } = options;

  const items = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const filteredItems = items.filter((item) => {
    if (item.name.startsWith('index.ts')) return false;
    if (item.name.includes('.test.')) return false;
    if (item.name.startsWith('_')) return false;
    return true;
  });

  const exports = await Promise.all(
    filteredItems.map((item) => {
      const exportName = path.parse(item.name).name;
      const defaultExport = `export { default as ${exportName} } from './${exportName}';`;

      if (defaultExportOnly) return defaultExport;
      return [`export * from './${exportName}';`, defaultExport].join('\n');
    })
  );

  const content = ['// AUTO-GENERATED, DO NOT EDIT', '', ...exports, ''].join(
    '\n'
  );

  return fs.writeFile(path.join(directory, 'index.ts'), content, {
    encoding: 'utf-8',
  });
}

/**
 * Loads the specified template.
 * Ignores sub-directories within the template.
 *
 * @param {string} name
 * @returns {Promise<{ name: string, content: string }[]>}
 */
async function loadTemplates(name) {
  const directory = path.join(__dirname, name);
  const files = (
    await fs.readdir(directory, {
      withFileTypes: true,
    })
  ).filter((item) => item.isFile());

  const templates = await Promise.all(
    files.map((file) =>
      fs
        .readFile(path.join(directory, file.name), { encoding: 'utf-8' })
        .then((content) => ({ name: file.name, content }))
    )
  );

  return templates;
}

require('yargs')
  .scriptName('generate')
  .usage('$0 <cmd> [args]')
  .command('component [name]', 'Generates a new UI component', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the component.',
        type: 'string',
        require: true,
        coerce: toPascalCase,
      });
      yargs.option('description', {
        describe: 'Description of the component. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: namePascalCase, description } = args;
      const nameKebabCase = kebabCase(namePascalCase);

      const name = {
        pascalCase: namePascalCase,
        kebabCase: nameKebabCase,
      };

      const templates = await loadTemplates('Component');

      const directory = path.join(PACKAGE_ROOT, 'src', 'ui', 'components');
      const componentPath = path.join(directory, namePascalCase);

      await fs.mkdir(componentPath, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              componentPath,
              template.name
                .replace('Component', namePascalCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      await generateIndexFile(directory);

      console.log(`Successfully created ${namePascalCase}`);
    },
  })
  .command('emotion [name]', 'Generates a new Emotion style set', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the styles.',
        type: 'string',
        require: true,
        coerce: toCamelCase,
      });
      yargs.option('description', {
        describe: 'Description of the styles. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: nameCamelCase, description } = args;

      const name = {
        camelCase: nameCamelCase,
      };

      const templates = await loadTemplates('Emotion');

      const directory = path.join(PACKAGE_ROOT, 'src', 'ui', 'emotion');
      await fs.mkdir(directory, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              directory,
              template.name
                .replace('Emotion', nameCamelCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      await generateIndexFile(directory, { defaultExportOnly: true });

      console.log(`Successfully created ${nameCamelCase}`);
    },
  })
  .command('slice [name]', 'Generates a new Redux Toolkit slice of state', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the slice of state being managed.',
        type: 'string',
        require: true,
        coerce: toCamelCase,
      });
      yargs.option('description', {
        describe: 'Description of the state being managed. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: nameCamelCase, description } = args;
      const namePascalCase = toPascalCase(nameCamelCase);

      const name = {
        camelCase: nameCamelCase,
        pascalCase: namePascalCase,
      };

      const templates = await loadTemplates('Slice');

      const directory = path.join(PACKAGE_ROOT, 'src', 'state', 'store');
      await fs.mkdir(directory, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              directory,
              template.name
                .replace('Slice', nameCamelCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      console.log(`Successfully created ${nameCamelCase}`);
    },
  })
  .command('icon [name]', 'Generates a new React icon component', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the icon.',
        type: 'string',
        require: true,
        coerce: toIconName,
      });
      yargs.option('description', {
        describe: 'Description of the icon. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: namePascalCase, description } = args;
      const nameKebabCase = kebabCase(namePascalCase);

      const name = {
        pascalCase: namePascalCase,
        kebabCase: nameKebabCase,
      };

      const templates = await loadTemplates('Icon');

      const directory = path.join(PACKAGE_ROOT, 'src', 'ui', 'icons');
      await fs.mkdir(directory, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              directory,
              template.name
                .replace('Icon', namePascalCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      await generateIndexFile(directory);

      console.log(`Successfully created ${namePascalCase}`);
    },
  })
  .command('view [name]', 'Generates a new view', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the view.',
        type: 'string',
        require: true,
        coerce: toViewName,
      });
      yargs.option('description', {
        describe: 'Description of the view. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: namePascalCase, description } = args;
      const nameKebabCase = kebabCase(namePascalCase);

      const name = {
        pascalCase: namePascalCase,
        kebabCase: nameKebabCase,
      };

      const templates = await loadTemplates('View');

      const directory = path.join(PACKAGE_ROOT, 'src', 'views');
      const componentPath = path.join(directory, namePascalCase);

      await fs.mkdir(componentPath, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              componentPath,
              template.name
                .replace('View', namePascalCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      await generateIndexFile(directory);

      console.log(`Successfully created ${namePascalCase}`);
    },
  })
  .demandCommand(1, 'No command was specified')
  .strictCommands()
  .help()
  .alias('h', 'help')
  .alias('v', 'version').argv;
