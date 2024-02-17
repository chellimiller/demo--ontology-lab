import * as React from 'react';
import useDialog, { DialogOptions } from './useDialog';

export type DialogContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

/**
 * Context for the Dialog component.
 * This is copied directly from the Floating UI example.
 *
 * @see https://codesandbox.io/s/charming-bush-47epk2
 */
const DialogContext = React.createContext<DialogContextType>(null);

export const useDialogContext = () => {
  const context = React.useContext(DialogContext);

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
};

export interface DialogContextProviderProps extends DialogOptions {
  children: React.ReactNode;
}

/**
 * Provider for the Dialog component.
 * This is modified from the Floating UI example.
 *
 * @see https://codesandbox.io/s/charming-bush-47epk2
 */
export const DialogContextProvider: React.FC<DialogContextProviderProps> = (
  props
) => {
  const { children, ...options } = props;

  const dialog = useDialog(options);

  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
};

export default DialogContext;
