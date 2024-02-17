/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
} from '@floating-ui/react';
import styled, { StyledComponent } from '@emotion/styled';
import { DialogContextProvider, useDialogContext } from './DialogContext';
import { heading, text } from '../../emotion';
import { DialogOptions } from './useDialog';

/**
 * Props for the Dialog
 */
export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    DialogOptions {}

export type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface DialogComponent
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<DialogProps> & React.RefAttributes<HTMLDivElement>
  > {
  Title: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  Content: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  Actions: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
}

const DialogOverlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
`.withComponent(FloatingOverlay);

const DialogWrapper = styled.div`
  background-color: var(--color--neutral--surface);
  color: var(--color--neutral--on-surface);
  margin: var(--m--md);
  padding: var(--p--lg);
  border-radius: var(--border-radius--md);
  display: flex;
  flex-flow: column nowrap;
`;

const DialogElement = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { context: floatingContext, ...context } = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, forwardedRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <DialogOverlay lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <DialogWrapper
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </DialogWrapper>
        </FloatingFocusManager>
      </DialogOverlay>
    </FloatingPortal>
  );
});

/**
 * Generic dialog component.
 *
 * @param props
 * @returns
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (props, forwardedRef) => {
    const { open, onClose, onOpen, ...forwardedProps } = props;

    return (
      <DialogContextProvider open={open} onClose={onClose} onOpen={onOpen}>
        <DialogElement {...forwardedProps} ref={forwardedRef} />
      </DialogContextProvider>
    );
  }
) as DialogComponent;

Dialog.Title = styled.h1`
  ${heading.sm};
  margin-bottom: var(--m--md);
`;

Dialog.Content = styled.h1`
  ${text.md};
`;

Dialog.Actions = styled.h1`
  ${text.md};
  margin-top: var(--m--md);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

export default Dialog;
