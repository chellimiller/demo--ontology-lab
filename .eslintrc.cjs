module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'prettier',
  ],
  rules: {
    'no-restricted-exports': 'off',
    // With TypeScript, this is less necessary. Since this isn't a library, we don't need to worry about JS-only usage.
    'react/prop-types': 'off',
    // Forwarding props is convenient when creating basic components used elsewhere.
    'react/jsx-props-no-spreading': 'off',
    // Declaring components as constants makes it easier to specify custom component types.
    'react/function-component-definition': 'off',
    // These can be defined during props destructuring. For example: { foo = 'value ' } = props;
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      files: ['index.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        // this setting is required to use rules that require type information
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      parserOptions: {
        // this setting is required to use rules that require type information
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
    {
      files: ['**/ui/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            // The "src/ui/" directory is for basic UI components only.
            // It should not know about the store, route, or anything beyond UI/presentational logic.
            patterns: [
              {
                group: ['react-router-dom'],
                message:
                  'Use the views/ directory for components that need to know about routes.',
              },
              {
                group: ['dexie', 'dexie-react-hooks', '*redux*'],
                message: 'State implementation should only be handled in data/',
              },
              {
                group: [
                  'dexie',
                  'dexie-react-hooks',
                  '*redux*',
                  '**/data',
                  '**/state/**',
                  '**/views/**',
                ],
                message:
                  'Use the views/ directory for components that need to access the app state.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/views/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            // The "src/views/" directory should not know about the state implementation.
            // However, it can know about routes and access anything else in the app.
            patterns: [
              {
                group: ['dexie', 'dexie-react-hooks', '*redux*'],
                message: 'State implementation should only be handled in data/',
              },
              {
                group: ['**/state/**'],
                message:
                  'Only import from the top level of the data directory.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/state/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            // The "src/state/" directory should not know the UI or views.
            patterns: [
              {
                group: ['react-router-dom'],
                message:
                  'Use the views/ directory (or a new one!) for logic connecting the route and state.',
              },
              {
                group: ['**/ui/**', '**/views/**'],
                message: 'The store should not know about the UI or views.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/store/**'],
      rules: {
        // Annoying rule within the store, since the Redux reducers need a default state.
        '@typescript-eslint/default-param-last': 'off',
      },
    },
  ],
};
