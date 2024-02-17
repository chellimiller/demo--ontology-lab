import { SerializedStyles, css } from '@emotion/react';
import text from './text';

interface ButtonStyles {
  base: SerializedStyles;
  rounded: SerializedStyles;
  variant: Record<'primary' | 'ghost' | 'filled', SerializedStyles>;
}

/**
 * Styles for a button component.
 *
 * These are used in the `ui/components/Button` component,
 * but they are also used for links and other elements that use button styling.
 */
const button: ButtonStyles = {
  base: css`
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;

    &:enabled {
      cursor: pointer;
    }

    min-width: var(--target--size);
    min-height: var(--target--size);
    max-height: var(--target--size);

    border-radius: var(--border-radius--md);

    ${text.md};
  `,
  rounded: css`
    border-radius: var(--border-radius--rounded);
  `,

  variant: {
    primary: css`
      background: var(--button--primary, var(--color--neutral--main));
      color: var(--button--on-primary, var(--color--neutral--on-main));

      &:hover {
        background: var(
          --button--primary--hover,
          var(--color--neutral--main--hover)
        );
        color: var(
          --button--on-primary--hover,
          var(--color--neutral--on-main--hover)
        );
      }

      &:active,
      &:focus {
        background: var(
          --button--primary--active,
          var(--color--neutral--main--active)
        );
        color: var(
          --button--on-primary--active,
          var(--color--neutral--on-main--active)
        );
      }

      &:disabled {
        background: var(
          --button--primary--disabled,
          var(--color--neutral--main--disabled)
        );
        color: var(
          --button--on-primary--disabled,
          var(--color--neutral--on-main--disabled)
        );
      }
    `,
    ghost: css`
      background: transparent;
      color: inherit;

      &:hover {
        background: var(
          --button--container--hover,
          var(--color--neutral--container--hover)
        );
        color: var(
          --button--on-container--hover,
          var(--color--neutral--on-container--hover)
        );
      }

      &:active,
      &:focus {
        background: var(
          --button--container--active,
          var(--color--neutral--container--active)
        );
        color: var(
          --button--on-container--active,
          var(--color--neutral--on-container--active)
        );
      }

      &:disabled {
        background: var(
          --button--container--disabled,
          var(--color--neutral--container--disabled)
        );
        color: var(
          --button--on-container--disabled,
          var(--color--neutral--on-container--disabled)
        );
      }
    `,
    filled: css`
      background: var(--button--container, var(--color--neutral--container));
      color: var(--button--on-container, var(--color--neutral--on-container));

      &:hover {
        background: var(
          --button--container--hover,
          var(--color--neutral--container--hover)
        );
        color: var(
          --button--on-container--hover,
          var(--color--neutral--on-container--hover)
        );
      }

      &:active,
      &:focus {
        background: var(
          --button--container--active,
          var(--color--neutral--container--active)
        );
        color: var(
          --button--on-container--active,
          var(--color--neutral--on-container--active)
        );
      }

      &:disabled {
        background: var(
          --button--container--disabled,
          var(--color--neutral--container--disabled)
        );
        color: var(
          --button--on-container--disabled,
          var(--color--neutral--on-container--disabled)
        );
      }
    `,
  },
};

export default button;
