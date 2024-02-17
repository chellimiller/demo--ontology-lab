import * as React from 'react';
import { DialogKey, closeDialog, useDialogIsOpen } from '../../state';
import Dialog from '../../ui/components/Dialog';

/**
 * Dialog to show the credits for the template.
 *
 * Feel free to remove this! It's here as an example of what a dialog view might look like.
 *
 * @param props
 * @returns
 */
const CreditsDialog: React.FC = () => {
  const open = useDialogIsOpen(DialogKey.CREDITS);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <Dialog.Title>Credits</Dialog.Title>
      <Dialog.Content>
        <p>
          This React app prototype template was created by{' '}
          <a href="https://github.com/chellimiller">Michelle Miller</a> and{' '}
          <a href="https://github.com/JaredBourget">Jared Bourget</a>.
        </p>
        <div>
          Beyond React, we used the following libraries:
          <ul>
            <li>
              <a href="https://emotion.sh/">Emotion</a> for styling components.
            </li>
            <li>
              <a href="https://floating-ui.com/">Floating UI</a> for dialogs and
              other poppers.
            </li>
            <li>
              <a href="https://feathericons.com/">Feather Icons</a> for icons.
            </li>
            <li>
              <a href="https://redux-toolkit.js.org/">Redux Toolkit</a> for
              managing page state and tree state.
            </li>
            <li>
              <a href="https://www.npmjs.com/package/clsx">clsx</a> for
              constructing class names.
            </li>
          </ul>
        </div>
        <div>
          The following libraries are also included:
          <ul>
            <li>
              <a href="https://github.com/sindresorhus/type-fest">Type Fest</a>{' '}
              for utility types.
            </li>
            <li>
              <a href="https://reactrouter.com/en/main">React Router</a> for
              routing and navigation.
            </li>
            <li>
              <a href="https://usehooks-ts.com/">usehooks-ts</a> for common
              utility hooks.
            </li>
            <li>
              <a href="https://moment.github.io/luxon/">Luxon</a> for date and
              time manipulation.
            </li>
            <li>
              <a href="https://lodash.com/">lodash</a> for generic utilities.
            </li>
            <li>
              <a href="https://dexie.org/">Dexie</a> for persisted data tables
              that can be queried.
            </li>
          </ul>
        </div>
        <p>
          To learn more,{' '}
          <a href="https://github.com/utori-dev/template-react-app-prototype">
            view the project on GitHub!
          </a>
        </p>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreditsDialog;
