# Simple React App Template

Starter React app with TypeScript and several helpful dependencies.

This template is intended for prototype apps.
With that said, it has a large amount of dependencies to get you off the ground quickly.

This prototype comes with the following dependencies:

- [Dexie][dexie] for persistent state management.
  - Dexie uses IndexedDB, so state is persisted.
  - Makes prototype development easier, since there may not be a backend at first.
  - Easily query the data.
  - Not ideal for theming, configuration, or page-specific state, so Redux is still included.
- [clsx][clsx] for class name creation.
- [Emotion][emotion] for UI components.
  - Allows you to easily design and style components.
- [Floating UI][floating-ui] for creating tooltips, dialogs, etc.
  - Replacement of the Popper library.
- [Lodash][lodash] for generic utilities.
- [Luxon][luxon] for managing dates.
  - Recommended successor to the Moment.
- [Type Fest][type-fest] for useful TypeScript types.
- [React Router][react-router] for routing.
- [Redux Toolkit][redux-toolkit] for page-specific state, theming, and configuration settings.
- [Rimraf][rimraf] The UNIX command `rm -rf` for node.
- [usehooks-ts][usehooks-ts] for useful hooks to help in a variety of situations.

This template is ideal for prototypes,
but includes more dependencies that are likely needed for your individual use case.
It's a good idea to review these dependencies and remove any you find unnecessary.

This template is quite restrictive to encourage good practices, even while prototyping.
Feel free to remove these restrictions if you decide they are unnecessary.

## Structure

### `state/`

This directory manages the app state.
It exports utilities to interact with the app state and
it should be the only directory to know about the store's implementation.

This is where both the Dexie database and Redux store lives.

### `ui/`

This is for presentational building block components.
It should not import any utilities from `views/` or `state/` or know anything about routes.

#### `components/`

This is for React components that are not tied to the state.
This directory may include things like buttons, cards, tooltips, etc.

#### `emotion/`

This is for Emotion styles that may be shared between components.

This directory may include things like typography styles, error color styling, etc.

#### `icons/`

This is for React icon components.

Components generated here will use the `SvgIcon` component.

### `views/`

This is for connected and routed components.
It can import from `ui/` and `state/` as needed.

Components in this directory will often be tied to routes, such as pages.

## Scripts

### Generate: `npm run generate:<type> -- [name]`

To generate new code, run one of the following:

- `npm run generate:component -- foo-bar`
  - Generates a generic UI component under `src/ui/components/`
  - Updates `src/ui/components/index.ts`
- `npm run generate:emotion -- foo-bar`
  - Generates an Emotion styles file under `src/ui/emotion/`
  - Updates `src/ui/emotion/index.ts`
- `npm run generate:icon -- foo-bar`
  - Generates a React icon component under `src/ui/icons/`
  - Appends `*Icon` to the name of the component
  - Updates `src/ui/icons/index.ts`
- `npm run generate:view -- foo-bar`
  - Generates a view component under `src/views/`
  - Appends `*View` to the name of the component

Read about the structure to learn more about the different components and code.

### Deploy to GitHub Pages: `npm run deploy`

To deploy to GitHub Pages, run `npm run deploy`.

This will publish the contents of the `dist/` directory to the `gh-pages` branch.
Remember to run `npm run build` first!

You may need to configure the settings of your repository to make GitHub Pages work correctly.
To learn more, [read the official GitHub guide on configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Build: `npm run build`

To build the app, run `npm run build`.

The generated output will be in the `dist/` directory.

### Clean: `npm run clean`

To clean `.cache`, `.tmp`, `lib`, `dist`, and `build` files and directories.

### Format: `npm run format`

To format the source code, run `npm run format`.

### Serve: `npm start`

To serve the app, run `npm start`.

The app will be updated automatically as code changes are saved.

To simulate a production environment, run `npm run start:production`.
Note that the `webpack-dev-server` is not intended for use in production environments.

### Test: `npm test`

To test the app, run `npm test`.

## Setting Up a Local Development Environment

### Pre-requisites

Before getting started, you will need [Git] and [Node.js].

#### [Git]

1. Open a terminal and run `git --version`
1. If Git is not installed, follow
   [the GitHub guide for setting up Git][github_docs_git]

#### [Node.js]

1. Open a terminal and run `node -v`
1. If Node.js is not installed or is not `v16.0.0` or above, follow
   [the official guide for installing Node.js][node_docs_install]

### Instructions

1. If you haven't already, [create a new GitHub repository from this template][generate].
1. On your machine, open a terminal.
1. Clone the repository you've created from the template.\
   Run `git clone <your-repository-url> <some-directory>`
1. Navigate to the directory where you cloned the repository.\
   Run `cd <some-directory>`
1. Install dependencies.\
   Run `npm install`
1. Serve app in development mode.\
   Run `npm start`

You are now ready to start coding!

[dexie]: https://dexie.org/
[clsx]: https://www.npmjs.com/package/clsx
[emotion]: https://emotion.sh/docs/introduction
[floating-ui]: https://floating-ui.com/
[generate]: https://github.com/utori-dev/template-react-app-prototype/generate
[git]: https://git-scm.com/
[github_docs_git]: https://docs.github.com/en/get-started/quickstart/set-up-git
[lodash]: https://lodash.com/
[luxon]: https://lodash.com/
[node.js]: https://nodejs.org/
[node_docs_install]: https://nodejs.dev/learn/how-to-install-nodejs
[react-router]: https://reactrouter.com/en/main
[redux-toolkit]: https://redux-toolkit.js.org/
[rimraf]: https://www.npmjs.com/package/rimraf
[type-fest]: https://github.com/sindresorhus/type-fest
[usehooks-ts]: https://usehooks-ts.com/
