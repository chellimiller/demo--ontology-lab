import * as React from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';

export interface DialogOptions {
  open: boolean;
  onClose: (event: Event | undefined) => void;
  onOpen?: (event: Event | undefined) => void;
}

/**
 * Hook to handle logic for the dialog.
 * This is copied directly from the Floating UI example.
 *
 * @see https://codesandbox.io/s/charming-bush-47epk2
 * @param options
 * @returns
 */
function useDialog(options: DialogOptions) {
  const { open, onClose, onOpen } = options;

  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const setOpen = React.useCallback(
    (nextOpen?: boolean, event?: Event | undefined) => {
      // @todo Determine what should happen if nextOpen is undefined
      if (nextOpen === false) onClose(event);
      if (nextOpen === true && onOpen) onOpen(event);
    },
    [onClose, onOpen]
  );

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const { context } = data;

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  );
}

export default useDialog;
